'use client';
import { motion } from "framer-motion";
import { siteConfig } from "../data/config";
import SpotlightCard from "./SpotlightCard";
import BorderGlow from "./BorderGlow";

const skillsData = [
  { name: "Frontend Architecture", items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"], color: "from-cyan-400 to-blue-500", icon: "01" },
  { name: "Backend Systems", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Auth0"], color: "from-purple-500 to-pink-500", icon: "02" },
  { name: "Digital Immersion", items: ["Three.js", "WebGL", "Figma", "Blender"], color: "from-green-400 to-emerald-600", icon: "03" }
];

export const Skills = () => {
  return (
    <section id="skills" className="section-padding relative">
      <div className="max-container">
        <h2 className="text-4xl md:text-6xl font-black mb-20 text-center neon-text uppercase tracking-tight">KNOWLEDGE BASE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillsData.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <SpotlightCard className="p-1 h-full">
                <div className="bg-black/90 p-10 rounded-lg h-full border border-white/5 group">
                  <div className={`text-5xl font-black mb-8 opacity-10 group-hover:opacity-30 transition-opacity bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.icon}
                  </div>
                  <h3 className={`text-2xl font-black mb-8 tracking-tighter uppercase text-white group-hover:text-cyan-400 transition-colors`}>{category.name}</h3>
                  <div className="flex flex-wrap gap-3">
                    {category.items.map(item => (
                      <span key={item} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
        <div className="mt-24 text-center">
           <BorderGlow className="inline-block p-1 rounded-xl">
              <a href={siteConfig.resumeLink} className="px-16 py-5 bg-black rounded-lg text-lg font-black uppercase tracking-widest text-white hover:text-cyan-400 transition-colors">
                Download Manuscript
              </a>
           </BorderGlow>
        </div>
      </div>
    </section>
  );
};
