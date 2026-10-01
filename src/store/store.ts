import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export type StoreState = {
  color: string;
  scale: number;
  texture: string;
  setTexture: (texture: string) => void;
  setColor: (color: string) => void;
  setScale: (scale: number) => void;
  resetStore: () => void;
};

export function createAppStore(initProps?: Partial<StoreState>) {
  const store = createStore<StoreState>()(
    persist(
      (set, get) => ({
        color: "#2e2c2e",
        scale: 0.08,
        texture: "/videos/feature-1.mp4",
        ...initProps,
        setColor: (color: string) => set({ color }),
        setScale: (scale: number) => set({ scale }),
        setTexture: (texture: string) => set({ texture }),
        resetStore: () =>
          set({
            color: "#2e2c2e",
            scale: 0.08,
            texture: "/videos/feature-1.mp4",
          }),
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
