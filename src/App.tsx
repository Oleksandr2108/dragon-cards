import "./App.css";
import BetBoard from "./components/BetBoard/BetBoard";
import GameBoard from "./components/GameBoard/GameBoard";
import ResultPopup from "./components/ResultPopup/ResultPopup";
import { useShuffle } from "./hooks/useShuffle";

function App() {
  const {
    flipTrigger,
    isUpperFaceUp,
    isAnimating,
    revealedIndexes,
    handleShuffle,
    popupResult,
  } = useShuffle();
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen py-6 lg:py-0">
      <div className="bg-[#141a26] w-full max-w-[700px] lg:w-auto lg:max-w-none lg:h-[700px] rounded-t-[20px] rounded-b-none lg:rounded-t-none lg:rounded-l-[20px]">
        <BetBoard
          isAnimating={isAnimating}
          handleShuffle={handleShuffle}
        />
      </div>
      <GameBoard
        flipTrigger={flipTrigger}
        isUpperFaceUp={isUpperFaceUp}
        revealedIndexes={revealedIndexes}
      />
      <ResultPopup result={popupResult} />
    </div>
  );
}

export default App;
