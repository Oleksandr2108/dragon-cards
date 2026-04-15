import { DndContext, closestCenter } from "@dnd-kit/core";
import DraggableCard from "../Card/DraggableCard";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useGameStore } from "../../store/useGameStore";

const LowCard = () => {
  const lowCards = useGameStore((s) => s.lowCards);
  const moveCard = useGameStore((s) => s.moveCard);
  const { selectedId, setSelectedId, handleDragStart, handleDragEnd } =
    useDragAndDrop(lowCards, moveCard);
  return (
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
  );
};

export default LowCard;
