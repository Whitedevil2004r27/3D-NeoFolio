'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../data/config";

export const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState(siteConfig.themes[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Set theme CSS variables or classes
    document.documentElement.style.setProperty('--primary-color', `var(--tw-color-${currentTheme.primary})`);
    // Note: Tailwind doesn't easily support variable class names without safe-listing, 
    // so we'll use a data attribute for high-level theme switching.
    document.documentElement.setAttribute('data-theme', currentTheme.name.toLowerCase().replace(' ', '-'));
  }, [currentTheme]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:border-cyan-400/50 transition-all text-xs font-bold uppercase tracking-tighter"
      >
        <span className={`w-3 h-3 rounded-full bg-${currentTheme.primary}`} />
        {currentTheme.name}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 right-0 bg-black/90 border border-white/10 rounded-xl p-2 w-48 backdrop-blur-xl z-[200]"
          >
            {siteConfig.themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => {
                  setCurrentTheme(theme);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors"
              >
                <span className={`w-4 h-4 rounded-full bg-${theme.primary}`} />
                {theme.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
