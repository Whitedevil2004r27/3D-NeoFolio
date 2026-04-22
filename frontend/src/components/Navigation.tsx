'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { siteConfig } from "../data/config";
import { Menu, X } from "lucide-react";
import { LiveStatus } from "./LiveStatus";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Logo } from "./Logo";
import { useScroll, useSpring } from "framer-motion";

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Artifacts" },
    { id: "skills", label: "Systems" },
    { id: "contact", label: "Terminal" }
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    // Add a small delay to allow the menu to start closing before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }} 
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
    >
      {/* Premium Glassmorphism Layer */}
      <div className="absolute inset-0 backdrop-blur-[32px] bg-black/40 border-b border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary to-transparent origin-left z-[101] shadow-[0_0_15px_theme(colors.primary/50%)]"
        style={{ scaleX }}
      />
      
      <div className="w-full px-4 md:px-6 lg:px-8 py-3.5 flex justify-between items-center relative z-[105]">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="cursor-pointer hover:scale-105 transition-transform" onClick={() => handleNavClick("hero")}>
            <Logo />
          </div>
          <div className="hidden lg:block border-l border-white/10 pl-6 md:pl-8">
            <LiveStatus />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-6 pr-6 border-r border-white/10">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => handleNavClick(item.id)}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group ${activeSection === item.id ? "text-primary" : "text-gray-500 hover:text-white"}`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div layoutId="active" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>
          <ThemeSwitcher />
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-[110] md:hidden bg-black/95 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-6">
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xl font-bold uppercase tracking-tighter text-left ${activeSection === item.id ? "text-primary" : "text-gray-400"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
