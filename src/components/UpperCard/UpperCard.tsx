import Card from "../Card/Card";
import { useGameStore } from "../../store/useGameStore";
import FlipCard from "./FlipCard";
import ResultRisk from "../ResultRisk/ResultRisk";

import Image from "../../assets/backface.png";
import { useShuffle } from "../../hooks/useShuffle";
import LowCard from "../LowCard/LowCard";
import SoundButton from "../SoundButton/SoundButton";
import ChoiceRisk from "../ChoiceRisk/ChoiceRisk";
import CustomButton from "../CustomButton/CustomButton";
import BetInput from "../BetInputBox/BetInputBox";
import Balance from "../Balance/Balance";

const FLIP_STEP_MS = 500;

const UpperCard = () => {
  const baseCards = useGameStore((s) => s.baseCards);

  const { flipTrigger, isAnimating, revealedIndexes, handleShuffle } =
    useShuffle();

  return (
    <div className="flex flex-col items-center gap-4">
      <SoundButton />

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

      <LowCard />
      <ResultRisk revealedIndexes={revealedIndexes} />
      <ChoiceRisk isAnimating={isAnimating} />

      <CustomButton
        onClick={handleShuffle}
        isAnimating={isAnimating}
        text="Place Bet"
        role={"large"}
      />
      <BetInput />
      <Balance />
    </div>
  );
};

export default UpperCard;
