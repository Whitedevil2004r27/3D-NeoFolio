'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const bootLines = [
  "BIOS VERSION: NEO-3D v4.2.0",
  "CPU: NEURAL_ENGINE-X9 @ 4.8GHz",
  "MEM: 128GB LPDDR5X-8533",
  "LOADING CORE MODULES...",
  "ESTABLISHING SECURE PROTOCOLS...",
  "SYNCING GITHUB CORE...",
  "INITIALIZING 3D ENVIRONMENT...",
  "BYPASSING FIREWALLS...",
  "SYSTEM ESTABLISHED."
];

export const TerminalLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [timestamp, setTimestamp] = useState("00:00:00"); // Static default for hydration

  useEffect(() => {
    setIsMounted(true);
    // Move dynamic time calculation to client-only useEffect
    setTimestamp(new Date().toLocaleTimeString());
    
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (currentLine < bootLines.length) {
      // Logic for random boot speeds already exists here which is safe as it's inside useEffect
      const delay = currentLine === 0 ? 300 : Math.random() * 200 + 50;
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      const exitTimeout = setTimeout(onComplete, 800);
      return () => clearTimeout(exitTimeout);
    }
  }, [currentLine, isMounted, onComplete]);

  // Handle Hydration: Render a static black screen placeholder for the first frame
  if (!isMounted) {
    return <div className="fixed inset-0 z-[1000] bg-black" />;
  }

  return (
    <motion.div 
      key="terminal-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[1000] bg-black flex items-center justify-center font-mono p-6 overflow-hidden"
    >
      <div className="max-w-xl w-full">
        <div className="mb-14 flex items-center justify-center scale-125">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-full border-t border-cyan-400/50 shadow-[0_0_40px_rgba(0,243,255,0.2)] flex items-center justify-center"
          >
             <div className="w-10 h-10 rounded-full border-b border-purple-500/50 animate-reverse-spin" />
          </motion.div>
        </div>

        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          <div className="space-y-3">
            {bootLines.slice(0, currentLine + 1).map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-[10px] md:text-xs tracking-tight ${i === bootLines.length - 1 ? 'text-cyan-400 font-black' : 'text-gray-400'}`}
              >
                <span className="text-white/10 mr-4 tabular-nums">[{timestamp}]</span>
                {line}
              </motion.div>
            ))}
            {currentLine < bootLines.length && (
              <motion.div 
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.4, repeat: Infinity }}
                className="inline-block w-1.5 h-3 bg-cyan-400 ml-1"
              />
            )}
          </div>
        </div>
        
        <div className="mt-10">
          <div className="h-[1px] w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(currentLine / bootLines.length) * 100}%` }}
              className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(0,243,255,1)]"
            />
          </div>
          <div className="mt-3 flex justify-between text-[8px] text-gray-600 font-black tracking-[0.3em] uppercase">
            <span>Kernel Initialization</span>
            <span className="text-cyan-400/50">{(currentLine / bootLines.length * 100).toFixed(0)}% Complete</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
