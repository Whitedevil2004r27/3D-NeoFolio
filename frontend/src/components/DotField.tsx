'use client';
import { useEffect, useRef, memo } from 'react';

const TWO_PI = Math.PI * 2;

interface Dot {
  x: number;
  y: number;
  originX: number;
  originY: number;
}

interface DotFieldProps {
  chunkSize?: number;
  dotSize?: number;
  dotColor?: string;
}

const DotField = ({ 
  chunkSize = 35, 
  dotSize = 1.2, 
  dotColor = 'rgba(0, 243, 255, 0.15)' 
}: DotFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let dots: Dot[] = [];
    let mouse = { x: -1000, y: -1000 };

    const init = () => {
      dots = [];
      for (let x = chunkSize / 2; x < width; x += chunkSize) {
        for (let y = chunkSize / 2; y < height; y += chunkSize) {
          dots.push({
            x, y, originX: x, originY: y
          });
        }
      }
    };

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Calculate scroll velocity decay
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 2;
      lastScrollY = currentScrollY;
      scrollVelocity *= 0.9; // Decay

      dots.forEach(dot => {
        const dx = mouse.x - dot.originX;
        const dy = (mouse.y + window.scrollY) - dot.originY; // Account for page scroll
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200; // Increased interaction radius
        
        ctx.fillStyle = dotColor;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          dot.x = dot.originX - dx * force * 0.4;
          // Apply scroll velocity to the Y displacement for "float" effect
          dot.y = dot.originY - (dy * force * 0.4) + (scrollVelocity * force * 0.2);
          ctx.fillStyle = `rgba(0, 243, 255, ${0.15 + force * 0.4})`;
        } else {
          // Subtle float even when not interacting
          dot.x = dot.originX;
          dot.y = dot.originY + (scrollVelocity * 0.05);
        }

        ctx.beginPath();
        const finalSize = dist < maxDist ? dotSize * 1.5 : dotSize;
        ctx.arc(dot.x, dot.y, finalSize, 0, TWO_PI);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    init();
    draw();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [chunkSize, dotSize, dotColor]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default memo(DotField);
