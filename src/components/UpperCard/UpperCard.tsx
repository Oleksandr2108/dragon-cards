import FlipCard from "./FlipCard";
import Card from "../Card/Card";
import Image from "../../assets/backface.png";
import { useGameStore } from "../../store/useGameStore";

interface UpperCardProps {
  flipTrigger: number;
  isUpperFaceUp: boolean;
  revealedIndexes: number[];
}

const FLIP_STEP_MS = 500;

const UpperCard = (props: UpperCardProps) => {
  const baseCards = useGameStore((s) => s.baseCards);
  return (
    <div className="flex gap-4">
      {baseCards.map((card, index) => (
        <FlipCard
          key={card.id}
          flipTrigger={props.flipTrigger}
          isFaceUp={props.isUpperFaceUp}
          delayMs={props.isUpperFaceUp ? index * FLIP_STEP_MS : 0}
          front={
            <img
              className="w-full h-50 object-cover"
              src={Image}
              alt={""}
            />
          }
          back={<Card srcImg={card.img} />}
        />
      ))}
    </div>
  );
};

export default UpperCard;
