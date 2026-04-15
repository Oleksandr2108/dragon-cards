import { useGameStore } from "../../store/useGameStore";
import CustomButton from "../CustomButton/CustomButton";

const BetInputBox = () => {
  const { betCounder, setBetCounter, doubleBet, halfBet, maxBet } =
    useGameStore();
  return (
    <div className="flex items-center gap-3 bg-gray-900 p-4 rounded-xl shadow-lg w-fit">
      <input
        type="number"
        value={betCounder}
        onChange={(e) => setBetCounter(Number(e.target.value))}
        className="w-24 text-center bg-gray-800 text-white border border-gray-600 rounded-lg py-2 outline-none focus:border-blue-500"
        min={1}
        max={1000}
      />
      <CustomButton
        onClick={halfBet}
        text=" /2"
        role="small"
      />

      <CustomButton
        onClick={doubleBet}
        text=" x2"
        role="small"
      />

      <CustomButton
        onClick={maxBet}
        text=" MAX"
        role="small"
      />
    </div>
  );
};
export default BetInputBox;
