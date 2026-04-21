'use client';
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { siteConfig } from "../data/config";
import { HeroSkills } from "./HeroSkills";
import DotField from "./DotField";
import BorderGlow from "./BorderGlow";
import { useScramble } from "../hooks/useScramble";
import Magnetic from "./Magnetic";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const { scrambledText: scrambledName, scramble: triggerNameScramble } = useScramble(siteConfig.developerName.toUpperCase(), 2000, 500);
  const { scrambledText: scrambledTitle } = useScramble(siteConfig.developerTitle, 2000, 1000);

  return (
    <section id="hero" className="min-h-[100vh] flex items-center justify-center relative overflow-hidden section-padding pt-24 md:pt-28">
      <DotField />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black pointer-events-none" />
      </div>

      <motion.div style={{ y: y1, opacity, scale }} className="max-container text-center z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1, ease: "circOut" }} 
          className="mb-8 flex justify-center"
        >
          <BorderGlow className="p-1 rounded-full shadow-[0_0_50px_rgba(0,243,255,0.2)]">
            <motion.div 
              style={{ rotate: useTransform(scrollY, [0, 1000], [0, 360]) }}
              className="responsive-profile overflow-hidden relative"
            >
              <img src={siteConfig.heroImage} alt={siteConfig.developerName} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </motion.div>
          </BorderGlow>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 neon-text tracking-tighter leading-[0.9] relative overflow-visible">
            <span 
              className="relative inline-block hover:animate-pulse transition-all cursor-default"
              onMouseEnter={triggerNameScramble}
            >
              HI, I'M <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-purple-600 drop-shadow-2xl">{scrambledName}</span>
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-400 mb-8 font-extralight tracking-[0.4em] uppercase min-h-[1.5em]">{scrambledTitle}</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="mb-10">
          <HeroSkills />
        </motion.div>

        <div className="flex justify-center">
          <Magnetic>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(0, 243, 255, 0.6)" }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} 
              className="cyber-button px-14 py-6 text-xl font-black rounded-lg border-2 bg-black/50 backdrop-blur-md"
            >
              EXPLORE ARCHIVE
            </motion.button>
          </Magnetic>
        </div>
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">Scroll to descend</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent animate-bounce" />
      </motion.div>
    </section>
  );
};
