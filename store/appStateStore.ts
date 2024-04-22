import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandAppStorage } from "./mmkv-storage";

export interface AppState {
  isSignedIn: boolean;
  updateSignedIn: (isSignedIn: boolean) => void;
}

export const useAppStateStore = create<AppState>()(
  persist(
    (set, get) => ({
      isSignedIn: false,
      updateSignedIn: (isSignedIn) => {
        set({ isSignedIn });
      },
    }),
    {
      name: "appState",
      storage: createJSONStorage(() => zustandAppStorage),
    }
  )
);
