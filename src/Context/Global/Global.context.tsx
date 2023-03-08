import React, { createContext, useCallback, useRef } from "react";

type IGlobalLoaderState = "idle" | "loading";
export type Store = { globalLoader: IGlobalLoaderState };

const useGlobalStoreData = (): {
  get: () => Store;
  set: (value: Partial<Store>) => void;
  subscribe: (callback: () => void) => () => void;
} => {
  const store = useRef<{ globalLoader: IGlobalLoaderState }>({
    globalLoader: "idle"
  });

  const subscribes = useRef(new Set<() => void>());

  const get = useCallback(() => store.current, []);

  const set = useCallback((value: Partial<Store>) => {
    store.current = {
      ...store.current,
      ...value
    };

    subscribes.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribes.current.add(callback);
    return () => subscribes.current.delete(callback);
  }, []);

  return {
    get,
    set,
    subscribe
  };
};

type IUseGlobalStore = ReturnType<typeof useGlobalStoreData>;

export const GlobalContext = createContext<IUseGlobalStore | null>(null);

export default function GlobalContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalContext.Provider value={useGlobalStoreData()}>
      {children}
    </GlobalContext.Provider>
  );
}
