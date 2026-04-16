import { useGameStore } from "../../store/useGameStore";

interface ResultRiskProps {
  revealedIndexes: number[];
}

const ResultRisk = ({ revealedIndexes }: ResultRiskProps) => {
  const riskCards = useGameStore((s) => s.riskCards);

  return (
    <div className="flex gap-4 justify-center mt-5">
      {riskCards.map((card, index) =>
        revealedIndexes.includes(index) ? (
          <div
            key={index}
            className="w-22.5  flex items-center justify-center"
          >
            <div className="w-15 h-15 flex items-center justify-center rounded-lg bg-[#0905058e]">
              <p
                className={`text-[20px] font-risk font-bold ${card === "LOST" ? "text-red-500" : "text-green-500"}`}
              >
                {typeof card === "string" ? card : `${card}x`}
              </p>
            </div>
          </div>
        ) : (
          <div
            key={index}
            className="w-22.5 flex items-center justify-center "
          >
            <div className="w-15 h-15 flex items-center justify-center rounded-lg bg-[#0905058e]">
              <p className="text-white text-[20px] font-risk font-bold ">
                {typeof card === "string" ? card : `${card}x`}
              </p>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default ResultRisk;
