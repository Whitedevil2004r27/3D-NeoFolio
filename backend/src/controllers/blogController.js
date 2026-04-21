const mockPosts = [
  {
    id: 1,
    title: "Mastering Three.js in 2024",
    excerpt: "Exploring the latest updates in WebGL and React Three Fiber for immersive web experiences.",
    date: "2024-03-15",
    tags: ["3D", "WebGL", "Three.js"],
    readingTime: "5 min"
  },
  {
    id: 2,
    title: "Next.js 15: What's New?",
    excerpt: "A deep dive into the new App Router features and server-side optimizations.",
    date: "2024-04-02",
    tags: ["Next.js", "React", "Frontend"],
    readingTime: "8 min"
  },
  {
    id: 3,
    title: "Cyberpunk UI Design Principles",
    excerpt: "How to craft high-impact neon aesthetics using Tailwind CSS and glassmorphism.",
    date: "2024-04-10",
    tags: ["UI/UX", "Tailwind", "Design"],
    readingTime: "4 min"
  }
];

exports.getAllPosts = (req, res) => {
  res.json(mockPosts);
};
