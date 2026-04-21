'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const LiveStatus = () => {
  const [status, setStatus] = useState<any>({
    isActive: true,
    text: "Analyzing System Core" // Default/Fallback status
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/status`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        setStatus(data);
      } catch (err) {
        // Maintain fallback but update visual if needed
        console.log("Status server unreachable, maintaining local state.");
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 px-5 py-2.5 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-full hover:border-primary/30 transition-colors group cursor-default"
    >
      <div className="relative flex items-center justify-center">
        <div className={`w-2.5 h-2.5 rounded-full ${status.isActive ? 'bg-primary' : 'bg-red-500'} shadow-[0_0_15px_rgba(0,243,255,0.5)]`} />
        <motion.div 
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute w-full h-full rounded-full ${status.isActive ? 'bg-primary' : 'bg-red-500'}`}
        />
        <motion.div 
          animate={{ scale: [1, 3, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          className={`absolute w-full h-full rounded-full ${status.isActive ? 'bg-primary' : 'bg-red-500'}`}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 group-hover:text-primary/60 transition-colors leading-none mb-1">Status: Online</span>
        <span className="text-xs font-black text-white tracking-widest uppercase transition-colors">{status.text}</span>
      </div>
    </motion.div>
  );
};
