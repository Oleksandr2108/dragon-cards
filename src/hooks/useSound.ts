"use client";

import { useRef, useCallback } from "react";

export const useSounds = () => {
  const flipAudioRef = useRef<HTMLAudioElement | null>(null);
  const coinsAudioRef = useRef<HTMLAudioElement | null>(null);
  const startAudioRef = useRef<HTMLAudioElement | null>(null);
  const lostAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);

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

  const playStart = useCallback(() => {
    if (!startAudioRef.current) {
      startAudioRef.current = new Audio("/start.mp3");
      startAudioRef.current.volume = 0.3;
    }

    startAudioRef.current.currentTime = 0;
    startAudioRef.current.play().catch(() => {});
  }, []);

  const lostResult = useCallback(() => {
    if (!lostAudioRef.current) {
      lostAudioRef.current = new Audio("/lost.mp3");
      lostAudioRef.current.volume = 0.3;
    }

    lostAudioRef.current.currentTime = 0;
    lostAudioRef.current.play().catch(() => {});
  }, []);

  const winResult = useCallback(() => {
    if (!winAudioRef.current) {
      winAudioRef.current = new Audio("/win.mp3");
      winAudioRef.current.volume = 0.3;
    }

    winAudioRef.current.currentTime = 0;
    winAudioRef.current.play().catch(() => {});
  }, []);

  return { playFlip, playCoins, playStart, lostResult, winResult };
};
