'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../data/config";
import { Github, Star, GitCommit, Book } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export const GithubStats = () => {
  const [stats, setStats] = useState<any>(null);
  const FALLBACK_STATS = {
    username: "PROJECT-NEO",
    totalStars: 142,
    totalCommits: "1.2k+",
    totalRepos: 24,
    topLanguages: [
      { name: "TypeScript", percent: 65, color: "#3178c6" },
      { name: "React", percent: 20, color: "#61dbfb" },
      { name: "Three.js", percent: 10, color: "#000000" },
      { name: "Node.js", percent: 5, color: "#3776ab" }
    ]
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/github/stats/${siteConfig.githubUsername}`);
        if (!response.ok) throw new Error("Fetch failed");
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Github stats fetch failed, using fallback", err);
        setStats(FALLBACK_STATS);
      }
    };
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <section className="py-20 text-center text-gray-500 font-mono uppercase text-[10px] tracking-widest animate-pulse">
        Initializing system metrics...
      </section>
    );
  }

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-container">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <SpotlightCard className="p-1">
            <div className="bg-black/90 p-8 md:p-12 relative overflow-hidden rounded-lg border border-white/5 shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-[15deg]">
                <Github size={300} />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black mb-12 flex items-center gap-6 uppercase tracking-tighter text-white">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Github className="text-primary" size={32} />
                  </div>
                  System Metrics <span className="text-gray-600 font-light">/ {stats.username?.toUpperCase() || 'CORE'}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                  <div className="flex flex-col gap-3 group">
                    <div className="flex items-center gap-3 text-gray-500 uppercase text-[10px] font-black tracking-[0.2em] group-hover:text-yellow-500 transition-colors">
                      <Star size={14} /> Total Impact
                    </div>
                    <div className="text-4xl md:text-6xl font-black text-white group-hover:text-primary transition-colors">{stats.totalStars}</div>
                    <div className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">Cumulative Stars</div>
                  </div>
                  <div className="flex flex-col gap-3 group">
                    <div className="flex items-center gap-3 text-gray-500 uppercase text-[10px] font-black tracking-[0.2em] group-hover:text-purple-500 transition-colors">
                      <GitCommit size={14} /> Neural Pulses
                    </div>
                    <div className="text-4xl md:text-6xl font-black text-white group-hover:text-primary transition-colors">{stats.totalCommits || "800+"}</div>
                    <div className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">Verified Commits</div>
                  </div>
                  <div className="flex flex-col gap-3 group">
                    <div className="flex items-center gap-3 text-gray-500 uppercase text-[10px] font-black tracking-[0.2em] group-hover:text-cyan-500 transition-colors">
                      <Book size={14} /> Repository Core
                    </div>
                    <div className="text-4xl md:text-6xl font-black text-white group-hover:text-primary transition-colors">{stats.totalRepos}</div>
                    <div className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">Project Nodes</div>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-white uppercase tracking-[0.4em]">Core Technologies</h4>
                    <span className="text-[10px] text-gray-500 font-mono">DISTRIBUTION ANALYTICS</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full flex overflow-hidden border border-white/5">
                    {stats.topLanguages?.map((lang: any) => (
                      <motion.div 
                        key={lang.name}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percent}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        style={{ backgroundColor: lang.color }}
                        className="h-full relative group"
                        title={`${lang.name}: ${lang.percent}%`}
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-10 gap-y-6">
                    {stats.topLanguages?.map((lang: any) => (
                      <div key={lang.name} className="flex items-center gap-4 group cursor-default">
                        <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.2)]" style={{ backgroundColor: lang.color }} />
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">{lang.name}</span>
                          <span className="text-[10px] font-mono text-gray-600">{lang.percent}% CONTENT</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};
