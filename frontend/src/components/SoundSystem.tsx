'use client';
import { createContext, useContext, useEffect, useRef } from 'react';

const SoundContext = createContext({
  playClick: () => {},
  playHover: () => {},
  playSuccess: () => {}
});

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const clickAudio = useRef<HTMLAudioElement | null>(null);
  const hoverAudio = useRef<HTMLAudioElement | null>(null);
  const successAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Subtle high-frequency tick sound (base64)
    clickAudio.current = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YS9vT18AZmFsc2UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==');
    clickAudio.current.volume = 0.1;

    hoverAudio.current = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YS9vT18AZmFsc2UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==');
    hoverAudio.current.volume = 0.03;
  }, []);

  const playClick = () => {
    if (clickAudio.current) {
      clickAudio.current.currentTime = 0;
      clickAudio.current.play().catch(() => {});
    }
  };

  const playHover = () => {
    if (hoverAudio.current) {
      hoverAudio.current.currentTime = 0;
      hoverAudio.current.play().catch(() => {});
    }
  };

  const playSuccess = () => {
    // Placeholder for success sound
    playClick();
  };

  return (
    <SoundContext.Provider value={{ playClick, playHover, playSuccess }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
