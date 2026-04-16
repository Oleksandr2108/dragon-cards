import { useEffect, useState } from "react";
import { useGameStore } from "../../store/useGameStore";
import CustomButton from "../CustomButton/CustomButton";

const BetInputBox = () => {
  const { betCounder, setBetCounter, doubleBet, halfBet, maxBet } =
    useGameStore();
  const [inputValue, setInputValue] = useState(betCounder.toFixed(2));

  useEffect(() => {
    setInputValue(betCounder.toFixed(2));
  }, [betCounder]);

  const commitBetValue = (value: string) => {
    const normalizedValue = value.replace(",", ".");
    const nextValue = Number.parseFloat(normalizedValue);

    if (Number.isNaN(nextValue)) {
      setBetCounter(1);
      return;
    }

    setBetCounter(nextValue);
  };

  const handleBetChange = (value: string) => {
    if (/^-?\d*([.,]\d{0,2})?$/.test(value)) {
      setInputValue(value);
    }
  };

  return (
    <div className="flex h-12 items-center justify-between bg-gray-900 p-2 rounded-lg  ">
      <input
        type="text"
        inputMode="decimal"
        value={inputValue}
        onChange={(e) => handleBetChange(e.target.value)}
        onBlur={(e) => commitBetValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            commitBetValue(inputValue);
            e.currentTarget.blur();
          }
        }}
        className="
        w-24 bg-transparent text-white border-none rounded-lg  outline-none 
        font-bold text-sm font-rubik
        "
      />
      <div className="flex gap-1">

      <CustomButton
        onClick={halfBet}
        text=" 1/2"
        role="small"
      />

      <CustomButton
        onClick={doubleBet}
        text=" x2"
        role="small"
      />

      <CustomButton
        onClick={maxBet}
        text=" Max"
        role="small"
      />
      </div>
    </div>
  );
};
export default BetInputBox;
