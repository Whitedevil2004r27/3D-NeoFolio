'use client';
import React from 'react';

interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  duration?: number;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = "",
  glowColor = "#00f3ff",
  duration = 4
}) => {
  return (
    <div className={`border-glow-container ${className}`}>
      <div 
        className="border-glow-element" 
        style={{ 
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0%, var(--primary) 50%, transparent 100%)`,
          animationDuration: `${duration}s`
        }} 
      />
      <div className="border-glow-content">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
