'use client';

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { siteConfig } from "../data/config";

export const Footer = () => {
  const socials = [
    { icon: Github, href: siteConfig.github },
    { icon: Linkedin, href: siteConfig.linkedin },
    { icon: Mail, href: `mailto:${siteConfig.email}` }
  ];

  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex justify-center gap-6 mb-8">
           {socials.map((s, i) => (
             <a key={i} href={s.href} className="p-3 bg-white/5 hover:bg-cyan-400 rounded-full transition-all duration-300">
               <s.icon className="w-6 h-6" />
             </a>
           ))}
        </div>
        <p className="text-gray-400 mb-2">{siteConfig.footerText}</p>
        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">Built with <Heart className="w-4 h-4 text-red-500" /> & Next.js</p>
      </div>
    </footer>
  );
};
