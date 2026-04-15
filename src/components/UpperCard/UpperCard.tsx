import { useState } from "react";
import Card from "../Card/Card";
import { useGameStore, initialRiskValues } from "../../store/useGameStore";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import DraggableCard from "../Card/DraggableCard";
import FlipCard from "./FlipCard";

import Image from "../../assets/backface.png";
import { useSounds } from "../../hooks/useSound";

const FLIP_STEP_MS = 500;
const FLIP_DURATION_MS = 650;
const REVEAL_STEP_MS = 300;

const UpperCard = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [flipTrigger, setFlipTrigger] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndexes, setRevealedIndexes] = useState<number[]>([]);

  const baseCards = useGameStore((s) => s.baseCards);
  const lowCards = useGameStore((s) => s.lowCards);
  const startGame = useGameStore((s) => s.startGame);
  const riskCards = useGameStore((s) => s.riskCards);
  const selectedRiskIndex = useGameStore((s) => s.selectedRiskIndex);
  const setRiskLevel = useGameStore((s) => s.setRiskLevel);
  const isPlayingSound = useGameStore((s) => s.isPlayingSound);
  const toggleSound = useGameStore((s) => s.toggleSound);
  const { betCounder, setBetCounter, doubleBet, halfBet, maxBet, balance } =
    useGameStore();
  const moveCard = useGameStore((s) => s.moveCard);
  const { playCoins } = useSounds();

  const handleShuffle = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);

    setRevealedIndexes([]);

    startGame();
    setFlipTrigger((prev) => prev + 1);

    const totalAnimationMs =
      (baseCards.length - 1) * FLIP_STEP_MS + FLIP_DURATION_MS;

    window.setTimeout(() => {
      const matches = useGameStore.getState().resultIndex;

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
        setIsAnimating(false);
      }, totalRevealTime);
    }, totalAnimationMs);
  };

  const handleSoundToggle = () => {
    toggleSound();
  };

  const handleDragStart = (event: DragStartEvent) => {
    setSelectedId(Number(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const oldIndex = lowCards.findIndex((card) => card.id === active.id);
    const newIndex = lowCards.findIndex((card) => card.id === over.id);
    if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return;
    moveCard(oldIndex, newIndex);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <button
          onClick={handleSoundToggle}
          className={`px-4 py-2 rounded font-medium transition-all active:scale-95 ${
            isPlayingSound
              ? "bg-amber-400 text-gray-900"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          {isPlayingSound ? "Sound: ON" : "Sound: OFF"}
        </button>
      </div>
      <div className="flex gap-4">
        {baseCards.map((card, index) => (
          <FlipCard
            key={`${flipTrigger}-${card.id}`}
            flipTrigger={flipTrigger}
            delayMs={index * FLIP_STEP_MS}
            front={
              <img
                className="w-20 h-40 object-cover"
                src={Image}
                alt={""}
              />
            }
            back={<Card color={card.color} />}
          />
        ))}
      </div>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4">
          {lowCards.map((card) => (
            <DraggableCard
              key={card.id}
              card={card}
              isSelected={selectedId === card.id}
              onSelect={setSelectedId}
            />
          ))}
        </div>
      </DndContext>
      <div className="flex gap-4">
        {riskCards.map((card, index) =>
          revealedIndexes.includes(index) ? (
            <div
              key={index}
              className="w-20 h-10 bg-amber-300"
            >
              <p>{card}</p>
            </div>
          ) : (
            <div
              key={index}
              className="w-20 h-10 bg-gray-300"
            >
              <p>{card}</p>
            </div>
          ),
        )}
      </div>
      <div className="flex gap-2">
        {initialRiskValues.map((risk, index) => (
          <button
            key={risk.value}
            onClick={() => setRiskLevel(index)}
            disabled={isAnimating}
            className={`px-4 py-2 rounded font-medium transition-all active:scale-95 ${
              selectedRiskIndex === index
                ? "bg-amber-400 text-gray-900"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {risk.value}
          </button>
        ))}
      </div>
      <button
        onClick={handleShuffle}
        disabled={isAnimating}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 active:scale-95 transition-all disabled:opacity-50"
      >
        Shuffle
      </button>
      <div className="flex items-center gap-3 bg-gray-900 p-4 rounded-xl shadow-lg w-fit">
        <input
          type="number"
          value={betCounder}
          onChange={(e) => setBetCounter(Number(e.target.value))}
          className="w-24 text-center bg-gray-800 text-white border border-gray-600 rounded-lg py-2 outline-none focus:border-blue-500"
          min={1}
          max={1000}
        />
        <button
          onClick={halfBet}
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
        >
          /2
        </button>

        <button
          onClick={doubleBet}
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
        >
          x2
        </button>

        <button
          onClick={maxBet}
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
        >
          MAX
        </button>
      </div>

      <h1>Balance: {balance}</h1>
    </div>
  );
};

export default UpperCard;
