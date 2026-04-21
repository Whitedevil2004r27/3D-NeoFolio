'use client';
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { siteConfig } from "../data/config";
import { HeroSkills } from "./HeroSkills";
import DotField from "./DotField";
import BorderGlow from "./BorderGlow";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

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
          className="mb-12 flex justify-center"
        >
          <BorderGlow className="p-1 rounded-full shadow-[0_0_50px_rgba(0,243,255,0.2)]">
            <motion.div 
              style={{ rotate: useTransform(scrollY, [0, 1000], [0, 360]) }}
              className="responsive-profile overflow-hidden relative"
            >
              <img src={siteConfig.heroImage} alt={siteConfig.developerName} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-cyan-400/10 mix-blend-overlay" />
            </motion.div>
          </BorderGlow>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 neon-text tracking-tighter leading-[0.85] relative">
            <span className="relative inline-block hover:animate-pulse transition-all">
              HI, I'M <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-2xl">{siteConfig.developerName.toUpperCase()}</span>
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-4xl text-gray-400 mb-10 font-extralight tracking-[0.4em] uppercase">{siteConfig.developerTitle}</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="mb-14">
          <HeroSkills />
        </motion.div>

        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(0, 243, 255, 0.6)" }} 
          whileTap={{ scale: 0.95 }} 
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} 
          className="cyber-button px-14 py-6 text-xl font-black rounded-lg border-2 bg-black/50 backdrop-blur-md"
        >
          EXPLORE ARCHIVE
        </motion.button>
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-[10px] font-black tracking-[0.5em] text-cyan-400 uppercase">Scroll to descend</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent animate-bounce" />
      </motion.div>
    </section>
  );
};
