import { Mail, Phone, Github, Linkedin } from "lucide-react";

export const siteConfig = {
  developerName: "PROJECT NEO",
  developerTitle: "SYSTEM ARCHITECT",
  logoText: "NEOFOLIO",
  logoImage: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100&h=100&fit=crop&q=80",
  resumeLink: "#",
  heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=800&fit=crop&q=80",
  aboutImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=800&fit=crop&q=80",
  heroSkills: "TypeScript • React • Next.js • Three.js • Node.js",
  aboutBio1: "NEOFOLIO-3D is an immersive architecture designed for high-performance visual identity and modular engineering.",
  aboutBio2: "This system specializes in bridging the gap between cinematic design and next-generation codebases.",
  aboutBio3: "Powered by Next.js, Framer Motion, and Three.js for seamless interactive experiences.",
  aboutBio4: "SYSTEM OPERATIONAL: INITIATE CONNECTION TO EXPLORE THE VAULT.",
  email: "contact@neo-folio.template",
  phone: "+0 (000) 000-0000",
  github: "https://github.com/neo-folio-template",
  githubUsername: "neo-folio-template",
  linkedin: "https://linkedin.com/in/neo-folio",
  footerText: `© ${new Date().getFullYear()} NEOFOLIO-3D | SYSTEM ARCHITECTURE`,

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
