import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export type StoreState = {
  color: string;
  scale: number;
  setColor: (color: string) => void;
  setScale: (scale: number) => void;
};

export function createAppStore(initProps?: Partial<StoreState>) {
  const store = createStore<StoreState>()(
    persist(
      (set, get) => ({
        color: "#2e2c2e",
        scale: 0.08,
        ...initProps,
        setColor: (color: string) => set({ color }),
        setScale: (scale: number) => set({ scale }),
        getStoreSnapshot: () => get(),
      }),
      {
        name: "Cube-Store",
        skipHydration: true,
      },
    ),
  );

  return store;
}

export type AppStore = ReturnType<typeof createAppStore>;
