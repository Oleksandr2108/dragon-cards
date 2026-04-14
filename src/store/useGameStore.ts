import { create } from "zustand";

type ResultType = "LOST" | number;

type Card = {
  id: number;
  color: string;
};

const initialCards: Card[] = [
  { id: 1, color: "bg-red-500" },
  { id: 2, color: "bg-blue-500" },
  { id: 3, color: "bg-green-500" },
  { id: 4, color: "bg-yellow-500" },
  { id: 5, color: "bg-purple-500" },
  { id: 6, color: "bg-pink-500" },
];

const initialRiskCards: ResultType[] = ["LOST", "LOST", 3, "LOST", 5, "LOST"];

interface GameStore {
  baseCards: Card[];
  lowCards: Card[];
  riskCards: ResultType[];
  resultIndex: number[];
  betCounder: number;
  balance: number;

  setBetCounter: (count: number) => void;
  doubleBet: () => void;
  halfBet: () => void;
  maxBet: () => void;
  initGame: () => void;
  shuffle: () => void;
  moveCard: (from: number, to: number) => void;
  reveal: () => ResultType;
  startGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  baseCards: [...initialCards],
  lowCards: [...initialCards],
  riskCards: [...initialRiskCards],
  resultIndex: [],
  betCounder: 1,
  balance: 1000,

  initGame: () => {
    set({ baseCards: [...initialCards] });
    set({ lowCards: [...initialCards] });
    set({ riskCards: [...initialRiskCards] });
    set({ resultIndex: [] });
  },

  setBalance: (amount: number) => {
    set({ balance: amount });
  },

  setBetCounter: (count: number) => {
    set({ betCounder: count });
  },

  doubleBet: () => {
    const currentCount = get().betCounder;
    const getBalance = get().balance;
    if (currentCount * 2 > getBalance) {
      set({ betCounder: getBalance });
      return;
    }
    const newCount = Math.min(currentCount * 2, 1000);

    set({ betCounder: newCount });
  },

  halfBet: () => {
    const currentCount = get().betCounder;
    const newCount = Math.max(Math.floor(currentCount / 2), 1);
    set({ betCounder: newCount });
  },

  maxBet: () => {
    const getBalance = get().balance;
    if (getBalance < 1000) {
      set({ betCounder: getBalance });
      return;
    }
    set({ betCounder: 1000 });
  },

  shuffle: () => {
    const shuffled = [...get().baseCards].sort(() => 0.5 - Math.random());
    const lowCards = get().lowCards;

    const matches: number[] = [];
    for (let i = 0; i < lowCards.length; i++) {
      if (lowCards[i].id === shuffled[i].id) {
        matches.push(i);
      }
    }

    set({ baseCards: shuffled, resultIndex: matches });
  },

  moveCard: (from: number, to: number) => {
    const lowCards = [...get().lowCards];
    [lowCards[from], lowCards[to]] = [lowCards[to], lowCards[from]];
    set({ lowCards });
  },

  reveal: () => {
    const { resultIndex, riskCards } = get();
    if (resultIndex.length === 0) return 0;

    let totalMultiplier = 0;
    for (const index of resultIndex) {
      const value = riskCards[index];
      if (value === "LOST") {
        return "LOST";
      } else {
        totalMultiplier += value;
      }
    }
    return totalMultiplier;
  },

  startGame: () => {
    const { betCounder, balance, shuffle } = get();

    let newBalance = balance - betCounder;

    shuffle();
    const result = get().reveal();

    if (result === "LOST") {
      set({ balance: newBalance });
    } else {
      newBalance += betCounder * result;
      set({ balance: newBalance });
    }
  },
}));
