import { useGameStore } from "../../store/useGameStore";

const Balance = () => {
  const { balance } = useGameStore();
  return <div className="text-2xl font-bold">Balance: {balance}</div>;
};

export default Balance;
