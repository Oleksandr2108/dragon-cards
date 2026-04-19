"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useGameStore } from "../store/useGameStore";
import { useSounds } from "./useSound";

const FLIP_STEP_MS = 500;
const FLIP_DURATION_MS = 650;
const REVEAL_STEP_MS = 300;

interface UseShuffleReturn {
  flipTrigger: number;
  isUpperFaceUp: boolean;
  isAnimating: boolean;
  revealedIndexes: number[];
  handleShuffle: () => void;
  popupResult: "LOST" | number | null;
}

export const useShuffle = (): UseShuffleReturn => {
  const { baseCardsLength, startGame, finalizeRound } = useGameStore(
    useShallow((s) => ({
      baseCardsLength: s.baseCards.length,
      startGame: s.startGame,
      finalizeRound: s.finalizeRound,
    })),
  );
  const { playCoins, playStart, lostResult, winResult } = useSounds();

  const [flipTrigger, setFlipTrigger] = useState(0);
  const [isUpperFaceUp, setIsUpperFaceUp] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndexes, setRevealedIndexes] = useState<number[]>([]);
  const [popupResult, setPopupResult] = useState<"LOST" | number | null>(null);
  const timeoutIdsRef = useRef<number[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach((id) => {
      window.clearTimeout(id);
    });
    timeoutIdsRef.current = [];
  }, []);

  const scheduleTimeout = useCallback(
    (callback: () => void, delayMs: number) => {
      const timeoutId = window.setTimeout(callback, delayMs);
      timeoutIdsRef.current.push(timeoutId);
    },
    [],
  );

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  const handleShuffle = () => {
    if (isAnimating) {
      return;
    }

    clearAllTimeouts();

    setIsAnimating(true);
    setRevealedIndexes([]);

    const { isPlayingSound } = useGameStore.getState();
    if (isPlayingSound) {
      playStart();
    }

    const openingFlipMs =
      (baseCardsLength - 1) * FLIP_STEP_MS + FLIP_DURATION_MS;
    const closingFlipMs = FLIP_DURATION_MS;

    const runRevealFlow = () => {
      const { resultIndex, isPlayingSound } = useGameStore.getState();
      const matches = resultIndex;

      matches.forEach((index, i) => {
        scheduleTimeout(() => {
          setRevealedIndexes((prev) => [...prev, index]);
          if (isPlayingSound) {
            playCoins();
          }
        }, i * REVEAL_STEP_MS);
      });

      const totalRevealTime = matches.length * REVEAL_STEP_MS;

      scheduleTimeout(() => {
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

        scheduleTimeout(() => {
          setPopupResult(null);
        }, 2000);
      }, totalRevealTime);
    };

    const startRound = () => {
      startGame();
      setFlipTrigger((prev) => prev + 1);
      setIsUpperFaceUp(true);

      scheduleTimeout(() => {
        runRevealFlow();
      }, openingFlipMs);
    };

    if (isUpperFaceUp) {
      setFlipTrigger((prev) => prev + 1);
      setIsUpperFaceUp(false);

      scheduleTimeout(() => {
        startRound();
      }, closingFlipMs);

      return;
    }

    startRound();
  };

  return {
    flipTrigger,
    isUpperFaceUp,
    isAnimating,
    revealedIndexes,
    handleShuffle,
    popupResult,
  };
};
