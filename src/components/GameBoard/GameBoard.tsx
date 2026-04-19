import LowCard from "../LowCard/LowCard";
import ResultRisk from "../ResultRisk/ResultRisk";
import SoundButton from "../SoundButton/SoundButton";

import styles from "./GameBoard.module.css";
import UpperCard from "../UpperCard/UpperCard";

interface GameBoardProps {
  flipTrigger: number;
  isUpperFaceUp: boolean;
  revealedIndexes: number[];
}

const GameBoard = ({
  flipTrigger,
  isUpperFaceUp,
  revealedIndexes,
}: GameBoardProps) => {
  return (
    <div className={styles.gameBoard}>
      <SoundButton />
      <div className="flex flex-col items-center gap-10">
        <UpperCard
          flipTrigger={flipTrigger}
          isUpperFaceUp={isUpperFaceUp}
          revealedIndexes={revealedIndexes}
        />

        <LowCard />
      </div>
      <ResultRisk revealedIndexes={revealedIndexes} />
    </div>
  );
};

export default GameBoard;
