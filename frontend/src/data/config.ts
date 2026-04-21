import { Mail, Phone, Github, Linkedin } from "lucide-react";

export const siteConfig = {
  developerName: "VAITHY RK",
  developerTitle: "FULL-STACK 3D ARCHITECT",
  logoText: "NEO-RK",
  logoImage: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100&h=100&fit=crop&q=80",
  resumeLink: "#",
  heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=800&fit=crop&q=80",
  aboutImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=800&fit=crop&q=80",
  heroSkills: "TypeScript • React • Next.js • Three.js • Node.js",
  aboutBio1: "As a <strong>System Architect</strong>, I specialize in crafting immersive digital ecosystems that blend high-performance engineering with cinematic visual design.",
  aboutBio2: "My architecture is built on the foundation of <strong>Next.js</strong>, <strong>Three.js</strong>, and <strong>Framer Motion</strong>, ensuring every interaction is fluid, intentional, and high-impact.",
  aboutBio3: "From decentralized interfaces to AI-driven visualizations, I push the boundaries of what is possible on the modern web.",
  aboutBio4: "SYSTEM OPERATIONAL: INITIATE CONNECTION TO EXPLORE THE VAULT.",
  email: "vaithyrk@professional.dev",
  phone: "+91 (000) 000-0000",
  github: "https://github.com/vaithyrk",
  githubUsername: "vaithyrk",
  linkedin: "https://linkedin.com/in/vaithyrk",
  footerText: `© ${new Date().getFullYear()} VAITHY RK | NEO-SYSTEMS`,

  // Theme Settings
  themes: [
    { name: "Cyber Cyan", primary: "cyan-400", secondary: "purple-600" },
    { name: "Neon Pink", primary: "pink-500", secondary: "blue-500" },
    { name: "Solar Orange", primary: "orange-500", secondary: "red-600" }
  ]
};

export const contactLinks = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, color: "from-purple-600 to-pink-600" },
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, '')}`, color: "from-cyan-600 to-blue-600" },
  { icon: Github, label: "GitHub", value: "Profile", href: siteConfig.github, color: "from-gray-600 to-gray-800" },
  { icon: Linkedin, label: "LinkedIn", value: "Profile", href: siteConfig.linkedin, color: "from-blue-600 to-indigo-600" }
];
