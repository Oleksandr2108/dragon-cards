import { useGameStore } from "../../store/useGameStore";

interface ResultRiskProps {
  revealedIndexes: number[];
}

const ResultRisk = ({ revealedIndexes }: ResultRiskProps) => {
  const riskCards = useGameStore((s) => s.riskCards);

  return (
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
  );
};

export default ResultRisk;
