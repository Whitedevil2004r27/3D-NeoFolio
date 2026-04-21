'use client';
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { TerminalLoader } from "./TerminalLoader";
import { SoundProvider } from "./SoundSystem";
import { SplashCursor } from "./SplashCursor";
import { SmoothScroll } from "./SmoothScroll";

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SoundProvider>
      <AnimatePresence mode="wait">
        {isLoading && (
          <TerminalLoader 
            key="loader" 
            onComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>
      
      {!isLoading && (
        <div key="content">
          <SplashCursor />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </div>
      )}
    </SoundProvider>
  );
};
