"use client";

import { useState, useRef, useCallback } from "react";

const SWAP_DURATION_MS = 350;

interface UseClickSwapReturn {
  selectedIndex: number | null;
  isSwapping: boolean;
  handleCardClick: (index: number) => void;
  getCardStyle: (index: number) => React.CSSProperties;
  setCardRef: (index: number, el: HTMLDivElement | null) => void;
}

export const useClickSwap = (
  moveCard: (from: number, to: number) => void,
): UseClickSwapReturn => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [swapPair, setSwapPair] = useState<{
    from: number;
    to: number;
    offsetX: number;
  } | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = useCallback((index: number, el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  }, []);

  const handleCardClick = useCallback(
    (index: number) => {
      if (swapPair) return;

      if (selectedIndex === null) {
        setSelectedIndex(index);
      } else if (selectedIndex === index) {
        setSelectedIndex(null);
      } else {
        const fromEl = cardRefs.current[selectedIndex];
        const toEl = cardRefs.current[index];
        if (!fromEl || !toEl) return;

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        const offsetX = toRect.left - fromRect.left;

        const capturedFrom = selectedIndex;
        setSwapPair({ from: capturedFrom, to: index, offsetX });

        setTimeout(() => {
          moveCard(capturedFrom, index);
          setSwapPair(null);
          setSelectedIndex(null);
        }, SWAP_DURATION_MS);
      }
    },
    [selectedIndex, swapPair, moveCard],
  );

  const getCardStyle = useCallback(
    (index: number): React.CSSProperties => {
      if (!swapPair) return {};

      const { from, to, offsetX } = swapPair;
      if (index === from) {
        return {
          transform: `translateX(${offsetX}px) translateY(-15px) scale(1.05)`,
          transition: `transform ${SWAP_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          zIndex: 2,
        };
      }
      if (index === to) {
        return {
          transform: `translateX(${-offsetX}px) translateY(15px) scale(0.95)`,
          transition: `transform ${SWAP_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          zIndex: 1,
        };
      }
      return {};
    },
    [swapPair],
  );

  return {
    selectedIndex,
    isSwapping: !!swapPair,
    handleCardClick,
    getCardStyle,
    setCardRef,
  };
};
