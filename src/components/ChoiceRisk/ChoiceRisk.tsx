import { initialRiskValues, useGameStore } from "../../store/useGameStore";

interface ChoiceRiskProps {
  isAnimating?: boolean;
}

const ChoiceRisk = ({ isAnimating }: ChoiceRiskProps) => {
  const selectedRiskIndex = useGameStore((s) => s.selectedRiskIndex);
  const setRiskLevel = useGameStore((s) => s.setRiskLevel);
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-white font-bold text-sm">Risk</h3>
      <div className="flex gap-2">
        {initialRiskValues.map((risk, index) => (
          <button
            key={risk.value}
            onClick={() => setRiskLevel(index)}
            disabled={isAnimating}
            className={`w-full px-2.5 py-2 rounded font-medium transition-all active:scale-95 cursor-pointer  text-sm ${
              selectedRiskIndex === index
                ? "bg-[#222734] text-[#ffd026]"
                : "bg-[#1b2030] text-white/40 hover:bg-[#222734]"
            }`}
          >
            {risk.value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChoiceRisk;
