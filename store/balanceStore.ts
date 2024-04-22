import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./mmkv-storage";

export interface Transaction {
  id: string;
  amount: number;
  title: string;
  date: Date;
}

export interface BalanceState {
  transactions: Transaction[];
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clear: () => void;
}

export const useBalanceStore = create<BalanceState>()(
  persist(
    (set, get) => ({
      transactions: [],
      runTransaction: (transaction) => {
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        }));
      },
      balance: () => {
        return get().transactions.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );
      },
      clear: () => {
        set({ transactions: [] });
      },
    }),
    {
      name: "balance",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
