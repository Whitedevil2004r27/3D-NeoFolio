'use client';
import { useEffect, useRef } from 'react';

export const SplashCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // We'll use a simplified fluid-like effect using canvas 2d for stability
    // but with a high particle count and velocity-based scaling for the "splash" feel.
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles: any[] = [];
    let mouse = { x: 0, y: 0, lastX: 0, lastY: 0, vX: 0, vY: 0 };

    const createParticle = (x: number, y: number, vx: number, vy: number) => {
      const size = Math.random() * 4 + 2;
      return {
        x, y,
        vx: vx * 0.5 + (Math.random() - 0.5) * 2,
        vy: vy * 0.5 + (Math.random() - 0.5) * 2,
        size,
        life: 1,
        color: Math.random() > 0.5 ? 
          getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#00f3ff' : 
          getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim() || '#bc13fe'
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Cap max movement delta to prevent extreme velocities
      const rawVX = mouse.x - mouse.lastX;
      const rawVY = mouse.y - mouse.lastY;
      mouse.vX = Math.max(Math.min(rawVX, 50), -50);
      mouse.vY = Math.max(Math.min(rawVY, 50), -50);

      const speed = Math.sqrt(mouse.vX * mouse.vX + mouse.vY * mouse.vY);
      // More aggressive particle cap: 500 instead of 1500
      if (speed > 8 && particles.length < 500) {
        const count = Math.min(speed / 4, 4); // Fewer particles per movement
        for (let i = 0; i < count; i++) {
          particles.push(createParticle(mouse.x, mouse.y, mouse.vX, mouse.vY));
        }
      }

      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const maxLifeLoss = 0.015;
      const velocityDecay = 0.95;

      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= velocityDecay;
        p.vy *= velocityDecay;
        p.life -= maxLifeLoss;
        p.size *= 0.985;

        if (p.life <= 0) return false;

        ctx.globalAlpha = p.life * 0.7;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        const drawSize = Math.max(p.size, 0.5);
        ctx.arc(p.x, p.y, drawSize, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[9999] pointer-events-none opacity-60"
    />
  );
};
