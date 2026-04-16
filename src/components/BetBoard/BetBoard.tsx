import Balance from "../Balance/Balance";
import BetInputBox from "../BetInputBox/BetInputBox";
import ChoiceRisk from "../ChoiceRisk/ChoiceRisk";
import CustomButton from "../CustomButton/CustomButton";

interface BetBoardProps {
  isAnimating: boolean;
  handleShuffle: () => void;
}

const BetBoard = ({ isAnimating, handleShuffle }: BetBoardProps) => {
  return (
    <div className="w-full lg:w-87.5 h-auto lg:h-full py-6 px-4 font-rubik flex flex-col gap-[18px]">
      <div className="flex flex-col gap-2">
        <h4 className="text-white font-bold text-sm">Bet Amount</h4>
        <div className="flex items-center justify-between">
          <p className="text-[#ffffff66] text-[13px]">Max bet: 1000.00</p>
          <p className="text-white text-[13px]"> $</p>
        </div>
        <BetInputBox />
      </div>

      <ChoiceRisk isAnimating={isAnimating} />

      <CustomButton
        onClick={handleShuffle}
        isAnimating={isAnimating}
        text="Place Bet"
        role={"large"}
      />
      <div className="mt-auto">
        <Balance />
      </div>
    </div>
  );
};

export default BetBoard;
