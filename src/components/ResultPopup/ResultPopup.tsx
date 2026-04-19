interface ResultPopupProps {
  result: "LOST" | number | null;
}

const ResultPopup = ({ result }: ResultPopupProps) => {
  if (result === null) return null;

  const isLost = result === "LOST";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className={`px-12 py-8 rounded-2xl text-5xl font-bold shadow-2xl animate-bounce
          ${
            isLost
              ? "bg-red-950 text-red-400 border-2 border-red-600"
              : "bg-green-950 text-green-400 border-2 border-green-600"
          }`}
      >
        {isLost ? "You lost!" : `You won! +${Number(result).toFixed(2)}`}
      </div>
    </div>
  );
};

export default ResultPopup;
