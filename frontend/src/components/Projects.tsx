'use client';

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { siteConfig } from "../data/config";
import SpotlightCard from "./SpotlightCard";
import { useSound } from "./SoundSystem";
import { ProjectHologram } from "./ProjectHologram";

const FALLBACK_PROJECTS = [
  {
    id: "proj-1",
    title: "NEO-DEX CORE",
    description: "A decentralized exchange interface with real-time WebGL price simulations and advanced liquidity mapping.",
    longDescription: "Neo-Dex Core is a next-generation trading interface built for the 3D web. It utilizes Three.js for immersive data visualization and Framer Motion for high-frequency layout transitions. The system bypasses traditional 2D limitations to provide a cockpit-like trading experience.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=800&fit=crop&q=80",
    stars: 842,
    tech: ["React", "Three.js", "Solidity", "GSAP"],
    github: "https://github.com/neo-folio-template",
    live: "#"
  },
  {
    id: "proj-2",
    title: "CYBER-LENS AI",
    description: "Machine learning visualization suite for real-time neural network diagnostics and pattern recognition.",
    longDescription: "Cyber-Lens AI translates complex neural network weights and biases into interactive 3D structures. Developers can traverse through convolution layers and analyze activation maps in real-time. Built to bridge the gap between abstract math and visual intuition.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&q=80",
    stars: 567,
    tech: ["Python", "PyTorch", "Next.js", "D3.js"],
    github: "https://github.com/neo-folio-template",
    live: "#"
  },
  {
    id: "proj-3",
    title: "VOID-OS SHELL",
    description: "A terminal-based operating system simulation built for the browser with sandboxed file systems.",
    longDescription: "Void-OS is a love letter to the early days of computing, augmented with modern glassmorphism and GPU-accelerated shaders. It features a fully functional custom shell, dynamic filesystem virtualization, and an integrated V8 runtime for executing script artifacts.",
    image: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=1200&h=800&fit=crop&q=80",
    stars: 1205,
    tech: ["TypeScript", "Rust", "WebAssembly", "Node.js"],
    github: "https://github.com/neo-folio-template",
    live: "#"
  }
];

export const Projects = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [liveProjects, setLiveProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { playClick, playHover } = useSound();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/github/repos/${siteConfig.githubUsername}`);
        if (!response.ok) throw new Error("Repos fetch failed");
        const data = await response.json();
        // If data is valid and not empty, use it; otherwise fallback
        setLiveProjects(data && data.length > 0 ? data : FALLBACK_PROJECTS);
      } catch (err) {
        console.error("Failed to fetch repos, using fallback data", err);
        setLiveProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-500 font-mono uppercase text-xs tracking-widest">
        Scanning artifact vault...
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-container">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-3xl md:text-5xl font-black mb-6 neon-text uppercase tracking-tight glitch-text" 
            data-text="SYSTEM ARTIFACTS"
          >
            SYSTEM ARTIFACTS
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 shadow-[0_0_15px_theme(colors.primary/50%)]" />
          <p className="text-lg md:text-2xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed uppercase tracking-widest">Repository classification and data extraction.</p>
        </div>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
        >
          {liveProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              <SpotlightCard
                onClick={() => { playClick(); setSelectedId(project.id); }}
                onMouseEnter={playHover}
                className="p-1 cursor-pointer group h-full"
              >
              <div className="bg-black/90 rounded-lg overflow-hidden h-full flex flex-col border border-white/5 group-hover:border-primary transition-colors">
                <div className="relative h-60 overflow-hidden">
                  <motion.img 
                    layoutId={`img-${project.id}`} 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <ProjectHologram type={project.title} />
                  <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                    <Star size={12} className="text-yellow-500" />
                    <span className="text-[10px] font-black text-white">{project.stars}</span>
                  </div>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <motion.h3 layoutId={`title-${project.id}`} className="text-xl font-black text-white mb-4 tracking-tighter uppercase group-hover:text-primary transition-colors">{project.title}</motion.h3>
                  <p className="text-gray-500 text-xs mb-8 line-clamp-3 font-medium uppercase tracking-tight leading-relaxed">{project.description}</p>
                  <div className="mt-auto pt-8 border-t border-white/5 flex flex-wrap gap-2">
                    {project.tech.map((t: string) => (
                      <span key={t} className="px-3 py-1 text-[9px] uppercase font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/98 backdrop-blur-xl" 
            />
            
            {liveProjects.filter(p => p.id === selectedId).map(project => (
              <motion.div
                key="modal"
                layoutId={`card-${project.id}`}
                className="relative w-full max-w-6xl h-[90vh] md:h-auto max-h-[95vh] bg-black border border-white/10 rounded-2xl overflow-y-auto z-10 p-6 md:p-12 shadow-2xl"
              >
                <button onClick={() => setSelectedId(null)} className="absolute top-8 right-8 p-3 bg-white/5 rounded-full text-white z-20 hover:bg-primary hover:text-black transition-all"><X /></button>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Bento Header */}
                  <div className="col-span-1 md:col-span-4 flex flex-col md:flex-row items-center gap-8 border-b border-white/10 pb-8">
                     <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary p-0.5">
                        <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center text-4xl font-black text-white">
                           {project.title.charAt(0)}
                        </div>
                     </div>
                     <div className="text-center md:text-left">
                        <motion.h3 layoutId={`title-${project.id}`} className="text-4xl md:text-6xl font-black neon-text uppercase tracking-tighter mb-2">{project.title}</motion.h3>
                        <p className="text-gray-500 uppercase tracking-[0.3em] font-black text-xs">Repository Identification Signature</p>
                     </div>
                  </div>

                  {/* Bento Content */}
                  <div className="col-span-1 md:col-span-2 space-y-6">
                     <div className="bg-white/[0.03] p-8 rounded-2xl border border-white/5">
                        <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Functional Summary</h4>
                        <p className="text-lg text-gray-300 leading-relaxed font-light">{project.longDescription}</p>
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 flex flex-col items-center">
                           <Star className="text-yellow-500 mb-2" size={24} />
                           <span className="text-2xl font-black text-white">{project.stars}</span>
                           <span className="text-[10px] text-gray-500 uppercase">Impact Score</span>
                        </div>
                        <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 flex flex-col items-center">
                           <Github className="text-purple-500 mb-2" size={24} />
                           <span className="text-2xl font-black text-white">LIVE</span>
                           <span className="text-[10px] text-gray-500 uppercase">System Status</span>
                        </div>
                     </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 space-y-6">
                     <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5">
                        <motion.img layoutId={`img-${project.id}`} src={project.image} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                     </div>
                     <div className="bg-white/[0.03] p-8 rounded-2xl border border-white/5">
                        <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Technological Stack</h4>
                        <div className="flex flex-wrap gap-3">
                           {project.tech.map((t: string) => <span key={t} className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-xs font-black text-primary uppercase tracking-widest">{t}</span>)}
                        </div>
                     </div>
                     <div className="flex gap-4 pt-4">
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex-1 cyber-button py-5 text-lg font-black uppercase tracking-widest flex items-center justify-center gap-3">Live Access <ExternalLink size={20} /></a>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"><Github size={28} /></a>
                     </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
