import { useContext, useSyncExternalStore } from "react";
import { GlobalContext, Store } from "./Global.context";

export default function useGlobalStore(): [
  Store,
  (value: Partial<Store>) => void
] {
  const store = useContext(GlobalContext);

  if (!store) {
    throw new Error("Store not found");
  }

  const state = useSyncExternalStore(store.subscribe, store.get);

  return [state, store.set];
}
