'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock } from "lucide-react";

export const KnowledgeHub = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/blog`);
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Blog fetch failed");
      }
    };
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="section-padding">
      <div className="max-container">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-12 text-left neon-text uppercase tracking-tighter">
          Knowledge <span className="text-gray-700">/</span> Hub
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="cyber-card p-6 flex flex-col h-full group"
            >
              <div className="flex gap-4 mb-6">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="text-[10px] uppercase font-black tracking-widest text-primary/70">{tag}</span>
                ))}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-300 transition-colors">{post.title}</h3>
              <p className="text-gray-400 text-sm mb-8 line-clamp-3 leading-relaxed">{post.excerpt}</p>
              
              <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between text-gray-500">
                <div className="flex items-center gap-4 text-xs font-bold uppercase">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {post.readingTime}</span>
                </div>
                <BookOpen size={20} className="group-hover:text-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
