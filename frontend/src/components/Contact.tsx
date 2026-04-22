'use client';

import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { contactLinks } from "../data/config";

import SpotlightCard from "./SpotlightCard";
import Magnetic from "./Magnetic";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.error || "Failed to send message.");
      }
    } catch (error) {
      toast.error("Could not connect to the backend server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen section-padding relative overflow-hidden">
      <div className="max-container">
        <h2 className="text-3xl md:text-5xl font-black mb-12 md:mb-16 text-center neon-text uppercase tracking-tight leading-none">Inquire Within</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SpotlightCard className="p-1 h-full">
              <div className="bg-black/90 p-10 md:p-12 rounded-lg h-full border border-white/5">
                <h3 className="text-3xl font-black mb-10 text-white tracking-tighter uppercase border-b border-primary/20 pb-6">Direct Channels</h3>
                <div className="space-y-8">
                  {contactLinks.map((link) => (
                    <a key={link.label} href={link.href} className="flex items-center space-x-6 p-6 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all group">
                      <div className={`p-4 bg-gradient-to-r ${link.color} rounded-xl shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform`}>
                        <link.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">{link.label}</p>
                        <p className="text-lg text-white font-medium group-hover:text-primary transition-colors uppercase tracking-tight">{link.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            <SpotlightCard className="p-1">
              <div className="bg-black/90 p-10 md:p-12 rounded-lg border border-white/5 space-y-8">
                <h3 className="text-xl font-black text-gray-500 uppercase tracking-[0.3em] mb-10">Establish Connection</h3>
                <div className="space-y-6">
                  <div className="relative group">
                      <input 
                        type="text" placeholder="IDENTITY" required 
                        className="w-full px-6 py-5 bg-white/5 border-b-2 border-white/10 focus:border-primary outline-none transition-all text-white font-mono placeholder:text-gray-700"
                        value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                  </div>
                  <div className="relative group">
                      <input 
                        type="email" placeholder="ENCRYPTED EMAIL" required 
                        className="w-full px-6 py-5 bg-white/5 border-b-2 border-white/10 focus:border-primary outline-none transition-all text-white font-mono placeholder:text-gray-700"
                        value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                  </div>
                  <div className="relative group">
                      <textarea 
                        placeholder="MESSAGE" rows={4} required 
                        className="w-full px-6 py-5 bg-white/5 border-b-2 border-white/10 focus:border-primary outline-none transition-all text-white font-mono placeholder:text-gray-700"
                        value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                  </div>
                </div>
                <Magnetic>
                    <button 
                      type="submit" disabled={isSubmitting}
                      className="w-full cyber-button py-6 rounded-xl flex items-center justify-center gap-4 text-lg font-black uppercase tracking-widest hover:shadow-[0_0_20px_theme(colors.primary/30%)]"
                    >
                    {isSubmitting ? "TRANSMITTING..." : <>INITIATE CONTACT <Send className="w-5 h-5 shadow-primary/50" /></>}
                  </button>
                </Magnetic>
              </div>
            </SpotlightCard>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
