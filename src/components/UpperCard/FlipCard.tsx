"use client";

import { useEffect, useState } from "react";
import { useSounds } from "../../hooks/useSound";
import { useGameStore } from "../../store/useGameStore";
interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  flipTrigger: number;
  delayMs?: number;
}

const FlipCard = ({ front, back, flipTrigger, delayMs = 0 }: FlipCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const { playFlip } = useSounds();
  const isPlayingSound = useGameStore((s) => s.isPlayingSound);
  const containerStyle: React.CSSProperties = {
    width: "80px",
    height: "160px",
    perspective: "1000px",
    cursor: "pointer",
  };

  const innerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    boxShadow: "0 10px 30px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "16px",
  };

  const faceBase: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    borderRadius: "16px",
    overflow: "hidden",
  };

  const backStyle: React.CSSProperties = {
    ...faceBase,
    transform: "rotateY(180deg)",
  };

  useEffect(() => {
    if (flipTrigger === 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setFlipped(true);
      if (isPlayingSound) {
        playFlip();
      }
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [delayMs, flipTrigger, isPlayingSound, playFlip]);

  return (
    <div style={containerStyle}>
      <div style={innerStyle}>
        <div
          style={faceBase}
          className="bg-white dark:bg-[#1f2937]"
        >
          {front}
        </div>
        <div
          style={backStyle}
          className="bg-white dark:bg-[#1f2937]"
        >
          {back}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
