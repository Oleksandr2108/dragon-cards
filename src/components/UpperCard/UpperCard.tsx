import FlipCard from "./FlipCard";
import Card from "../Card/Card";
import Image from "../../assets/backface.png";
import { useGameStore } from "../../store/useGameStore";

interface UpperCardProps {
  flipTrigger: number;
  revealedIndexes: number[];
}
const FLIP_STEP_MS = 500;
const UpperCard = (props: UpperCardProps) => {
  const baseCards = useGameStore((s) => s.baseCards);
  return (
    <div className="flex gap-4">
      {baseCards.map((card, index) => (
        <FlipCard
          key={`${props.flipTrigger}-${card.id}`}
          flipTrigger={props.flipTrigger}
          delayMs={index * FLIP_STEP_MS}
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
