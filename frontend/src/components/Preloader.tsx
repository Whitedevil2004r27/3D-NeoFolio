'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIALIZATION_LOGS = [
  "Initializing Kernel...",
  "Loading 3D Rendering Engine...",
  "Syncing Artifact Vault...",
  "Establishing Neural Connection...",
  "Calibrating Matrix...",
  "System Boot Complete."
];

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    const logTimer = setInterval(() => {
      setLogIndex((prev) => (prev < INITIALIZATION_LOGS.length - 1 ? prev + 1 : prev));
    }, 600);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-md">
        <div className="flex justify-between items-end mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-cyan-400 font-black tracking-[0.4em] uppercase mb-1">System Boot</span>
            <span className="text-xs text-gray-500 font-mono uppercase">{INITIALIZATION_LOGS[logIndex]}</span>
          </div>
          <span className="text-2xl font-black text-white font-mono">{Math.floor(progress)}%</span>
        </div>
        
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
          <motion.div 
            className="h-full bg-cyan-400 shadow-[0_0_20px_rgba(0,243,255,0.8)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        
        <div className="mt-12 grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="h-[2px] w-full bg-white/5" />
              <div className="flex justify-between items-center">
                <div className={`w-1 h-1 rounded-full ${progress > (i + 1) * 30 ? 'bg-cyan-400' : 'bg-gray-800'}`} />
                <span className="text-[8px] text-gray-600 font-mono uppercase">Node 0{i+1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 text-[10px] text-gray-700 font-mono tracking-[0.5em] uppercase">
        NEOFOLIO-3D CORE v1.0.4
      </div>
    </motion.div>
  );
};
