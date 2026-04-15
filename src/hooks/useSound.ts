"use client";

import { useRef, useCallback } from "react";

export const useSounds = () => {
  const flipAudioRef = useRef<HTMLAudioElement | null>(null);
  const coinsAudioRef = useRef<HTMLAudioElement | null>(null);

  const playFlip = useCallback(() => {
    if (!flipAudioRef.current) {
      flipAudioRef.current = new Audio("/flip.mp3");
      flipAudioRef.current.volume = 0.3;
    }

    flipAudioRef.current.currentTime = 0;
    flipAudioRef.current.play().catch(() => {});
  }, []);

  const playCoins = useCallback(() => {
    if (!coinsAudioRef.current) {
      coinsAudioRef.current = new Audio("/coins.mp3");
      coinsAudioRef.current.volume = 0.3;
    }

    coinsAudioRef.current.currentTime = 0;
    coinsAudioRef.current.play().catch(() => {});
  }, []);

  return { playFlip, playCoins };
};
