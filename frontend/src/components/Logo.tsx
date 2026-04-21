'use client';

import React from 'react';

export const Logo = () => {
  return (
    <div className="flex items-center group cursor-pointer">
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
        <svg
          width="40"
          height="40"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 filter drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
        >
          <path
            d="M20 10H80C85.5228 10 90 14.4772 90 20V80C90 85.5228 85.5228 90 80 90H20C14.4772 90 10 85.5228 10 80V20C10 14.4772 14.4772 10 20 10Z"
            stroke="url(#neonGradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M30 30V70L50 50L70 70V30"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--secondary)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="ml-3 hidden sm:block">
        <span className="text-xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent uppercase tracking-tighter leading-none">
          NEOFOLIO<span className="text-gray-500 font-light ml-1">3D</span>
        </span>
      </div>
    </div>
  );
};
