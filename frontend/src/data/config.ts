import { Mail, Phone, Github, Linkedin } from "lucide-react";

export const siteConfig = {
  developerName: "Ravikumar J",
  developerTitle: "Creative Frontend Engineer",
  logoText: "RK-NEOFOLIO",
  logoImage: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100&h=100&fit=crop&q=80",
  resumeLink: "#",
  heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&q=80",
  heroSkills: "React • Next.js • TypeScript • Three.js • GSAP",
  aboutBio1: "Hi, I'm Ravikumar J, a developer dedicated to building high-performance 3D web experiences.",
  aboutBio2: "I specialize in bridging the gap between cinematic design and modular engineering.",
  aboutBio3: "My arsenal includes Next.js, Framer Motion, and Three.js for building the next generation of web interfaces.",
  aboutBio4: "Let's connect and build something immersive.",
  email: "ravikumar.dev@example.com",
  phone: "+91 98765 43210",
  github: "https://github.com/Whitedevil2004r27",
  githubUsername: "Whitedevil2004r27",
  linkedin: "https://linkedin.com/in/ravikumar-j",
  footerText: `© ${new Date().getFullYear()} Ravikumar J`,

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
