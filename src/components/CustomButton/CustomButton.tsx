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
      className={` rounded font-rubik  transition-all active:scale-95  cursor-pointer ${
        role === "small"
          ? "w-10 h-8 bg-[#1b2030] hover:bg-[#222734] text-[#fff6] hover:text-white rounded-lg text-[12px] "
          : "rounded-2 h-10 bg-[#025cc1] font-bold text-white text-[14px] active:scale-95 transition-all disabled:opacity-50"
      }`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
