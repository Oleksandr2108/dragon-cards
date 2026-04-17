import Card from "../Card/Card";
import { useClickSwap } from "../../hooks/useDragAndDrop";
import { useGameStore } from "../../store/useGameStore";

const LowCard = () => {
  const lowCards = useGameStore((s) => s.lowCards);
  const moveCard = useGameStore((s) => s.moveCard);
  const { selectedIndex, handleCardClick, getCardStyle, setCardRef } =
    useClickSwap(moveCard);

  return (
    <div className="flex gap-4">
      {lowCards.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => setCardRef(index, el)}
          style={getCardStyle(index)}
          className={`cursor-pointer relative rounded-[20px] ${
            selectedIndex === index
              ? "ring-4 ring-yellow-400 shadow-lg shadow-yellow-400/50"
              : ""
          }`}
          onClick={() => handleCardClick(index)}
        >
          <Card srcImg={card.img} />
        </div>
      ))}
    </div>
  );
};

export default LowCard;
