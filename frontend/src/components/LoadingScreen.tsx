'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOG_MESSAGES = [
  "INITIALIZING KERNEL...",
  "LOADING NEURAL NETWORKS...",
  "MOUNTING 3D ASSETS...",
  "ESTABLISHING SECURE PROTOCOLS...",
  "SYNCING REPOSITORY DATA...",
  "OPTIMIZING SHADERS...",
  "SYSTEM CORE OPERATIONAL."
];

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentLog = 0;
    const logInterval = setInterval(() => {
      if (currentLog < LOG_MESSAGES.length) {
        setLogs(prev => [...prev, LOG_MESSAGES[currentLog]]);
        currentLog++;
      } else {
        clearInterval(logInterval);
        setTimeout(onComplete, 1000);
      }
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-8 font-mono"
    >
      <div className="w-full max-w-2xl">
        <div className="flex justify-between mb-4 text-primary text-xs tracking-widest font-black">
          <span>SYSTEM_INIT_SEQUENCE</span>
          <span>{progress}%</span>
        </div>
        
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-12 border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-primary shadow-[0_0_15px_theme(colors.primary/50%)]"
          />
        </div>

        <div className="space-y-2 h-40 overflow-hidden">
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest flex items-center gap-4"
              >
                <span className="text-primary/40">[{new Date().toLocaleTimeString()}]</span>
                <span className={i === LOG_MESSAGES.length - 1 ? "text-primary font-black" : ""}>
                  {log}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-20 flex flex-col items-center">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 border-2 border-primary/20 rounded-full flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_theme(colors.primary/100%)]" />
          </motion.div>
          <span className="mt-4 text-[10px] text-gray-700 uppercase tracking-[0.5em]">Establishing Connection</span>
        </div>
      </div>
    </motion.div>
  );
};
