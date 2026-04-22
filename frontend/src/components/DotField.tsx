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
  dotSize = 1.2
}: DotFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeColorRef = useRef('rgba(0, 243, 255, 0.15)');

  useEffect(() => {
    const updateColor = () => {
      const color = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      if (color) themeColorRef.current = color;
    };
    
    updateColor();
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    
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
      
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 2;
      lastScrollY = currentScrollY;
      scrollVelocity *= 0.9;

      dots.forEach(dot => {
        const dx = mouse.x - dot.originX;
        const dy = (mouse.y + window.scrollY) - dot.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        
        // Base dot color with low opacity
        ctx.fillStyle = themeColorRef.current.includes('rgba') ? themeColorRef.current : `${themeColorRef.current}26`; // 26 is ~15% opacity in hex

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          dot.x = dot.originX - dx * force * 0.4;
          dot.y = dot.originY - (dy * force * 0.4) + (scrollVelocity * force * 0.2);
          
          // Brighter color on interaction
          ctx.fillStyle = themeColorRef.current;
          ctx.globalAlpha = 0.15 + force * 0.4;
        } else {
          dot.x = dot.originX;
          dot.y = dot.originY + (scrollVelocity * 0.05);
          ctx.globalAlpha = 0.15;
        }

        ctx.beginPath();
        const finalSize = dist < maxDist ? dotSize * 1.5 : dotSize;
        ctx.arc(dot.x, dot.y, finalSize, 0, TWO_PI);
        ctx.fill();
        ctx.globalAlpha = 1.0;
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
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [chunkSize, dotSize]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default memo(DotField);
