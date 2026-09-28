"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { AppStore, createAppStore, StoreState } from "./store";
import { useStore as useZustandStore } from "zustand";

//1. Create the React Context
const StoreContext = createContext<AppStore | null>(null);

interface StoreProviderProps {
  children: React.ReactNode;
  initialState?: Partial<StoreState>;
}

// 2. The Provider Component

const StoreProvider = ({ children, initialState }: StoreProviderProps) => {
  //Use Ref to store store instance across renders
  const storeRef = useRef<AppStore | null>(null);

  // eslint-disable-next-line react-hooks/refs
  if (!storeRef.current) {
    storeRef.current = createAppStore(initialState);
  }

  useEffect(() => {
    storeRef.current?.persist.rehydrate();
  }, []);

  return (
    // eslint-disable-next-line react-hooks/refs
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

// 3. Hook to select state
export function useMacbookStore<T>(selector: (state: StoreState) => T): T {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error("useAppStore must be used within StoreProvider");
  }

  return useZustandStore(storeContext, selector);
}

// 4. Hook to Obtain row store API (for rehydration/listener in Server Components)

export function useMacbookStoreApi() {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error("useStoreApi must be used within StoreProvider");
  }

  return storeContext;
}
