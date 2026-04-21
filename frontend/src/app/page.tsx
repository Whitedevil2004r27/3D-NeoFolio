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

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      <ParticleBackground />
      <div className="cyber-grid fixed inset-0 opacity-30 pointer-events-none" />
      
      <Navigation />
      <Hero />
      <About />
      <GithubStats />
      <Projects />
      <KnowledgeHub />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
