'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { MessageSquare, X, Send, Bot } from "lucide-react";

const AIOrb = ({ color = "var(--primary)" }: { color?: string }) => {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          speed={4}
          distort={0.4}
          radius={1}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0}
          metalness={1}
        />
      </Sphere>
    </Float>
  );
};

export const NeoAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [themeColor, setThemeColor] = useState("cyan");
  const [messages, setMessages] = useState([
    { role: 'bot', content: "SYSTEM INITIALIZED. I AM NEO-AI. HOW CAN I ASSIST YOUR INVESTIGATION?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const updateColor = () => {
      const color = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      if (color) setThemeColor(color);
    };
    
    updateColor();
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    // Simple mock responses
    setTimeout(() => {
      let response = "PROTOCOL RECOGNIZED. DATA EXTRACTION IN PROGRESS...";
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes("project") || lowerInput.includes("work")) {
        response = "ANALYZING REPOSITORY CORE. MULTIPLE HIGH-PERFORMANCE ARTIFACTS DETECTED. WOULD YOU LIKE TO EXPLORE THE TECH STACK?";
      } else if (lowerInput.includes("who") || lowerInput.includes("you")) {
        response = "I AM THE NEURAL CORE OF THIS ARCHITECTURE. I MONITOR ALL SYSTEM SIGNALS AND ASSIST IN DATA EXTRACTION.";
      } else if (lowerInput.includes("contact") || lowerInput.includes("hire")) {
        response = "INITIATING COMMUNICATION PROTOCOL. PLEASE USE THE TERMINAL SECTION BELOW TO ESTABLISH A DIRECT LINK.";
      } else if (lowerInput.includes("skill") || lowerInput.includes("tech")) {
        response = "SYSTEM CAPABILITIES: REACT, NEXT.JS, THREE.JS, AND NODE.JS DETECTED. ALL SYSTEMS OPERATIONAL.";
      }
      
      setMessages([...newMessages, { role: 'bot', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-24 right-0 w-80 md:w-96 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Bot size={20} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Neural Core / Neo-AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="h-80 overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {messages.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-xl text-[10px] md:text-xs font-mono tracking-tight leading-relaxed ${m.role === 'user' ? 'bg-primary/10 border border-primary/20 text-white' : 'bg-white/5 border border-white/10 text-gray-400'}`}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex gap-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/5 bg-black/50 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="COMMAND INPUT..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[10px] font-mono text-white outline-none focus:border-primary/50 transition-all placeholder:text-gray-700"
              />
              <button 
                onClick={handleSend}
                className="p-3 bg-primary text-black rounded-lg hover:opacity-80 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        <div className="absolute -inset-4 bg-primary rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="w-16 h-16 md:w-20 md:h-20 bg-black/80 backdrop-blur-xl border border-primary/30 rounded-full overflow-hidden shadow-[0_0_30px_theme(colors.primary/20%)]">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} />
            <AIOrb color={themeColor} />
          </Canvas>
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full border-4 border-black flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
        </div>
      </motion.button>
    </div>
  );
};
