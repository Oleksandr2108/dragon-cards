import { useState, useRef, useCallback } from "react";

const SWAP_DURATION_MS = 350;

interface UseClickSwapReturn {
  selectedIndex: number | null;
  isSwapping: boolean;
  handleCardClick: (index: number) => void;
  handleCardSwap: (from: number, to: number) => void;
  getCardStyle: (index: number) => React.CSSProperties;
  setCardRef: (index: number, el: HTMLDivElement | null) => void;
}

interface UseCardDragAndDropParams {
  isSwapping: boolean;
  handleCardSwap: (from: number, to: number) => void;
}

interface UseCardDragAndDropReturn {
  draggedIndex: number | null;
  dropTargetIndex: number | null;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragLeave: (index: number) => void;
  onDrop: (targetIndex: number) => void;
  onDragEnd: () => void;
  shouldIgnoreClick: () => boolean;
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

  const handleCardSwap = useCallback(
    (from: number, to: number) => {
      if (swapPair || from === to) {
        return;
      }

      const fromEl = cardRefs.current[from];
      const toEl = cardRefs.current[to];
      if (!fromEl || !toEl) {
        moveCard(from, to);
        setSelectedIndex(null);
        return;
      }

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      const offsetX = toRect.left - fromRect.left;

      setSwapPair({ from, to, offsetX });

      setTimeout(() => {
        moveCard(from, to);
        setSwapPair(null);
        setSelectedIndex(null);
      }, SWAP_DURATION_MS);
    },
    [moveCard, swapPair],
  );

  const handleCardClick = useCallback(
    (index: number) => {
      if (swapPair) return;

      if (selectedIndex === null) {
        setSelectedIndex(index);
      } else if (selectedIndex === index) {
        setSelectedIndex(null);
      } else {
        handleCardSwap(selectedIndex, index);
      }
    },
    [selectedIndex, swapPair, handleCardSwap],
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
    handleCardSwap,
    getCardStyle,
    setCardRef,
  };
};

export const useCardDragAndDrop = ({
  isSwapping,
  handleCardSwap,
}: UseCardDragAndDropParams): UseCardDragAndDropReturn => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  const wasDraggingRef = useRef(false);

  const onDragStart = useCallback(
    (index: number) => {
      if (isSwapping) {
        return;
      }

      wasDraggingRef.current = true;
      setDraggedIndex(index);
      setDropTargetIndex(null);
    },
    [isSwapping],
  );

  const onDragEnter = useCallback((index: number) => {
    setDropTargetIndex(index);
  }, []);

  const onDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>, index: number) => {
      e.preventDefault();
      setDropTargetIndex(index);
    },
    [],
  );

  const onDragLeave = useCallback((index: number) => {
    setDropTargetIndex((current) => (current === index ? null : current));
  }, []);

  const onDrop = useCallback(
    (targetIndex: number) => {
      if (isSwapping || draggedIndex === null || draggedIndex === targetIndex) {
        setDraggedIndex(null);
        setDropTargetIndex(null);
        return;
      }

      handleCardSwap(draggedIndex, targetIndex);
      setDraggedIndex(null);
      setDropTargetIndex(null);
    },
    [draggedIndex, handleCardSwap, isSwapping],
  );

  const onDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDropTargetIndex(null);

    setTimeout(() => {
      wasDraggingRef.current = false;
    }, 0);
  }, []);

  const shouldIgnoreClick = useCallback(() => wasDraggingRef.current, []);

  return {
    draggedIndex,
    dropTargetIndex,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    shouldIgnoreClick,
  };
};
