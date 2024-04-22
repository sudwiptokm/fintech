import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

const storage = new MMKV({
  id: "balance-storage",
});

const storage2 = new MMKV({
  id: "app-storage",
});

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

export const zustandAppStorage: StateStorage = {
  setItem: (name, value) => {
    return storage2.set(name, value);
  },
  getItem: (name) => {
    const value = storage2.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage2.delete(name);
  },
};
