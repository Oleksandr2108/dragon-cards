interface CustomButtonProps {
  role: "small" | "large";
  text: string;
  onClick: () => void;
  isAnimating?: boolean;
}

const CustomButton = ({
  role,
  text,
  onClick,
  isAnimating,
}: CustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isAnimating}
      className={`px-4 py-2 rounded font-medium transition-all active:scale-95 ${
        role === "small"
          ? "px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
          : "px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 active:scale-95 transition-all disabled:opacity-50"
      }`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
