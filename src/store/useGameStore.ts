import { create } from "zustand";
import { persist } from "zustand/middleware";

type ResultType = "LOST" | number;

type Card = {
  id: number;
  color: string;
};

type RiskValue = {
  value: string;
  result: ResultType[];
};

const initialCards: Card[] = [
  { id: 1, color: "bg-red-500" },
  { id: 2, color: "bg-blue-500" },
  { id: 3, color: "bg-green-500" },
  { id: 4, color: "bg-yellow-500" },
  { id: 5, color: "bg-purple-500" },
  { id: 6, color: "bg-pink-500" },
];

export const initialRiskValues: RiskValue[] = [
  { value: "Low", result: ["LOST", 1, 2, 1, 2.5, 1.5] },
  { value: "Medium", result: ["LOST", 3, 5, "LOST", 6, 1.5] },
  { value: "High", result: ["LOST", "LOST", 25, "LOST", 50, "LOST"] },
  { value: "Classic", result: ["LOST", 3.5, 4, "LOST", 10, 7] },
];
interface GameStore {
  baseCards: Card[];
  lowCards: Card[];
  riskCards: ResultType[];
  resultIndex: number[];
  betCounder: number;
  balance: number;
  selectedRiskIndex: number;
  isPlayingSound: boolean;
  pendingPayout: number;

  setBetCounter: (count: number) => void;
  doubleBet: () => void;
  halfBet: () => void;
  maxBet: () => void;
  setRiskLevel: (index: number) => void;
  toggleSound: () => void;
  initGame: () => void;
  shuffle: () => void;
  moveCard: (from: number, to: number) => void;
  reveal: () => ResultType;
  startGame: () => void;
  finalizeRound: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      baseCards: [...initialCards],
      lowCards: [...initialCards],
      riskCards: [...initialRiskValues[3].result],
      resultIndex: [],
      betCounder: 1,
      balance: 1000,
      selectedRiskIndex: 3,
      isPlayingSound: true,
      pendingPayout: 0,

      setRiskLevel: (index: number) => {
        set({
          selectedRiskIndex: index,
          riskCards: [...initialRiskValues[index].result],
        });
      },

      toggleSound: () => {
        set((state) => ({ isPlayingSound: !state.isPlayingSound }));
      },

      initGame: () => {
        const { selectedRiskIndex } = get();
        set({ baseCards: [...initialCards] });
        set({ lowCards: [...initialCards] });
        set({ riskCards: [...initialRiskValues[selectedRiskIndex].result] });
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
        const newBalance = balance - betCounder;

        shuffle();
        const result = get().reveal();

        if (result === "LOST") {
          set({ balance: newBalance, pendingPayout: 0 });
        } else {
          set({ balance: newBalance, pendingPayout: betCounder * result });
        }
      },

      finalizeRound: () => {
        const { balance, pendingPayout } = get();
        if (pendingPayout <= 0) {
          return;
        }

        set({
          balance: balance + pendingPayout,
          pendingPayout: 0,
        });
      },
    }),
    {
      name: "dragon-cards-game-store",
      partialize: (state) => ({
        balance: state.balance,
        selectedRiskIndex: state.selectedRiskIndex,
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<GameStore>;
        const savedRiskIndex =
          typeof persisted.selectedRiskIndex === "number" &&
          initialRiskValues[persisted.selectedRiskIndex]
            ? persisted.selectedRiskIndex
            : currentState.selectedRiskIndex;
        const savedBalance =
          typeof persisted.balance === "number"
            ? persisted.balance
            : currentState.balance;

        return {
          ...currentState,
          ...persisted,
          balance: savedBalance,
          selectedRiskIndex: savedRiskIndex,
          riskCards: [...initialRiskValues[savedRiskIndex].result],
        };
      },
    },
  ),
);
