import { useGameStore } from "../../store/useGameStore";

const Balance = () => {
  const { balance } = useGameStore();
  return (
    <div className="h-10 w-full py-2 bg-[#1b2030] font-bold text-white rounded text-center">
      <span className="text-white/80 text-sm font-medium">Balance:</span> {balance}
    </div>
  );
};

export default Balance;
