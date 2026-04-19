"use client";

import { useEffect, useState } from "react";
import { useSounds } from "../../hooks/useSound";
import { useGameStore } from "../../store/useGameStore";
import styles from "./FlipCard.module.css";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  flipTrigger: number;
  isFaceUp: boolean;
  delayMs?: number;
}

const FlipCard = ({
  front,
  back,
  flipTrigger,
  isFaceUp,
  delayMs = 0,
}: FlipCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const { playFlip } = useSounds();
  const isPlayingSound = useGameStore((s) => s.isPlayingSound);

  useEffect(() => {
    if (flipTrigger === 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setFlipped(isFaceUp);
      if (isFaceUp && isPlayingSound) {
        playFlip();
      }
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [delayMs, flipTrigger, isFaceUp, isPlayingSound, playFlip]);

  return (
    <div className={styles.container}>
      <div className={`${styles.inner} ${flipped ? styles.innerFlipped : ""}`}>
        <div className={`${styles.face} bg-white dark:bg-[#1f2937]`}>
          {front}
        </div>
        <div
          className={`${styles.face} ${styles.back} bg-white dark:bg-[#1f2937]`}
        >
          {back}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
