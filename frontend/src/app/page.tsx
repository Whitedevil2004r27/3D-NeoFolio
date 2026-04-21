"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";
import { GithubStats } from "@/components/GithubStats";
import { KnowledgeHub } from "@/components/KnowledgeHub";
import { SystemDashboard } from "@/components/SystemDashboard";
import { NeoAI } from "@/components/NeoAI";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen bg-black text-white relative cursor-none">
      <CustomCursor />
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ParticleBackground />
          <div className="cyber-grid fixed inset-0 opacity-30 pointer-events-none" />
          
          <Navigation />
          <Hero />
          <About />
          <GithubStats />
          <Projects />
          <KnowledgeHub />
          <Skills />
          <SystemDashboard />
          <Contact />
          <Footer />
          <NeoAI />
        </>
      )}
    </main>
  );
}
