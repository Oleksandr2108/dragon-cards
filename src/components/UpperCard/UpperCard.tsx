import { useState } from "react";
import Card from "../Card/Card";
import { useGameStore } from "../../store/useGameStore";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import DraggableCard from "../Card/DraggableCard";

const UpperCard = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const baseCards = useGameStore((s) => s.baseCards);
  const lowCards = useGameStore((s) => s.lowCards);
  const startGame = useGameStore((s) => s.startGame);
  const resultIndex = useGameStore((s) => s.resultIndex);
  const riskCards = useGameStore((s) => s.riskCards);
  const totalMultiplier = useGameStore((s) => s.reveal());
  const { betCounder, setBetCounter, doubleBet, halfBet, maxBet, balance } =
    useGameStore();

  console.log(totalMultiplier);

  const moveCard = useGameStore((s) => s.moveCard);

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
        {baseCards.map((card) => (
          <Card
            key={card.id}
            color={card.color}
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
          resultIndex.includes(index) ? (
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
      <button
        onClick={startGame}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 active:scale-95 transition-all"
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
