"use client";

import { useState } from "react";
import { useGameStore } from "../store/useGameStore";
import { useSounds } from "./useSound";

const FLIP_STEP_MS = 500;
const FLIP_DURATION_MS = 650;
const REVEAL_STEP_MS = 300;

interface UseShuffleReturn {
  flipTrigger: number;
  isAnimating: boolean;
  revealedIndexes: number[];
  handleShuffle: () => void;
  popupResult: "LOST" | number | null;
}

export const useShuffle = (): UseShuffleReturn => {
  const baseCardsLength = useGameStore((s) => s.baseCards.length);
  const startGame = useGameStore((s) => s.startGame);
  const finalizeRound = useGameStore((s) => s.finalizeRound);
  const { playCoins, playStart, lostResult, winResult } = useSounds();

  const [flipTrigger, setFlipTrigger] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndexes, setRevealedIndexes] = useState<number[]>([]);
  const [popupResult, setPopupResult] = useState<"LOST" | number | null>(null);

  const handleShuffle = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    setRevealedIndexes([]);

    const { isPlayingSound } = useGameStore.getState();
    if (isPlayingSound) {
      playStart();
    }

    startGame();
    setFlipTrigger((prev) => prev + 1);

    const totalAnimationMs =
      (baseCardsLength - 1) * FLIP_STEP_MS + FLIP_DURATION_MS;

    window.setTimeout(() => {
      const { resultIndex, isPlayingSound } = useGameStore.getState();
      const matches = resultIndex;

      matches.forEach((index, i) => {
        setTimeout(() => {
          setRevealedIndexes((prev) => [...prev, index]);
          if (isPlayingSound) {
            playCoins();
          }
        }, i * REVEAL_STEP_MS);
      });

      const totalRevealTime = matches.length * REVEAL_STEP_MS;

      setTimeout(() => {
        const { pendingPayout, isPlayingSound } = useGameStore.getState();
        const result: "LOST" | number =
          pendingPayout > 0 ? pendingPayout : "LOST";

        if (isPlayingSound) {
          if (result === "LOST") {
            lostResult();
          } else {
            winResult();
          }
        }

        setPopupResult(result);
        finalizeRound();
        setIsAnimating(false);

        setTimeout(() => {
          setPopupResult(null);
        }, 2000);
      }, totalRevealTime);
    }, totalAnimationMs);
  };

  return {
    flipTrigger,
    isAnimating,
    revealedIndexes,
    handleShuffle,
    popupResult,
  };
};
