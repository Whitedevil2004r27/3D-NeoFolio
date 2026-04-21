'use client';
import { motion } from "framer-motion";
import { siteConfig } from "../data/config";
import BorderGlow from "./BorderGlow";
import SpotlightCard from "./SpotlightCard";

export const About = () => {
  return (
    <section id="about" className="section-padding overflow-hidden">
      <div className="max-container grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 
            className="text-3xl md:text-4xl font-black mb-8 neon-text uppercase tracking-tighter glitch-text" 
            data-text="THE ARCHITECT"
          >
            THE ARCHITECT
          </h2>
          <SpotlightCard className="p-1">
            <div className="bg-black/80 p-8 md:p-12 space-y-8">
              <p className="text-base md:text-xl leading-relaxed text-gray-300 font-light" dangerouslySetInnerHTML={{ __html: siteConfig.aboutBio1 }} />
              <p className="text-base md:text-xl leading-relaxed text-gray-400 font-light" dangerouslySetInnerHTML={{ __html: siteConfig.aboutBio2 }} />
              <p className="text-sm md:text-base leading-relaxed text-gray-500 font-light italic" dangerouslySetInnerHTML={{ __html: siteConfig.aboutBio3 }} />
              <p className="text-base md:text-xl leading-relaxed text-cyan-400 font-black border-l-4 border-cyan-400/30 pl-6 uppercase tracking-tighter" dangerouslySetInnerHTML={{ __html: siteConfig.aboutBio4 }} />
            </div>
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="relative group">
            <BorderGlow duration={6} className="p-2 rounded-full">
               <div className="w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden relative">
                  <img src={siteConfig.aboutImage || siteConfig.heroImage} alt="Profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-transparent mix-blend-overlay" />
               </div>
            </BorderGlow>
            <div className="absolute -inset-10 bg-cyan-400 rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
