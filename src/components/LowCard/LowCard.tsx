import Card from "../Card/Card";
import { useCardDragAndDrop, useClickSwap } from "../../hooks/useDragAndDrop";
import { useGameStore } from "../../store/useGameStore";

const LowCard = () => {
  const lowCards = useGameStore((s) => s.lowCards);
  const moveCard = useGameStore((s) => s.moveCard);

  const {
    selectedIndex,
    isSwapping,
    handleCardClick,
    handleCardSwap,
    getCardStyle,
    setCardRef,
  } = useClickSwap(moveCard);
  const {
    draggedIndex,
    dropTargetIndex,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    shouldIgnoreClick,
  } = useCardDragAndDrop({ isSwapping, handleCardSwap });

  return (
    <div className="flex gap-4">
      {lowCards.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => setCardRef(index, el)}
          style={getCardStyle(index)}
          className={`cursor-grab active:cursor-grabbing relative rounded-[20px] transition-shadow ${
            selectedIndex === index
              ? "ring-4 ring-yellow-400 shadow-lg shadow-yellow-400/50"
              : ""
          } ${
            draggedIndex === index
              ? "opacity-80 ring-4 ring-yellow-400 shadow-lg shadow-sky-400/40"
              : ""
          } ${
            dropTargetIndex === index && draggedIndex !== index
              ? "ring-4 ring-violet-400 shadow-lg shadow-emerald-400/40"
              : ""
          }`}
          draggable
          onDragStart={() => onDragStart(index)}
          onDragEnter={() => onDragEnter(index)}
          onDragOver={(e) => onDragOver(e, index)}
          onDragLeave={() => onDragLeave(index)}
          onDrop={() => onDrop(index)}
          onDragEnd={onDragEnd}
          onClick={() => {
            if (shouldIgnoreClick()) {
              return;
            }

            handleCardClick(index);
          }}
        >
          <Card srcImg={card.img} />
        </div>
      ))}
    </div>
  );
};

export default LowCard;
