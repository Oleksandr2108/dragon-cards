import { initialRiskValues, useGameStore } from "../../store/useGameStore";

interface ChoiceRiskProps {
  isAnimating?: boolean;
}

const ChoiceRisk = ({ isAnimating }: ChoiceRiskProps) => {
    const selectedRiskIndex = useGameStore((s) => s.selectedRiskIndex);
    const setRiskLevel = useGameStore((s) => s.setRiskLevel);
  return (
    <div className="flex gap-2">
        {initialRiskValues.map((risk, index) => (
          <button
            key={risk.value}
            onClick={() => setRiskLevel(index)}
            disabled={isAnimating}
            className={`px-4 py-2 rounded font-medium transition-all active:scale-95 ${
              selectedRiskIndex === index
                ? "bg-amber-400 text-gray-900"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {risk.value}
          </button>
        ))}
      </div>
  )
}

export default ChoiceRisk;