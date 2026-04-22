'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const skills = [
  "FULL-STACK DEVELOPER",
  "UI/UX DESIGNER",
  "THREE.JS ENTHUSIAST",
  "NEXT.JS EXPERT"
];

export const HeroSkills = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={skills[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="text-primary font-mono tracking-[0.4em] text-sm md:text-base font-bold"
        >
          {skills[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
