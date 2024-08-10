"use client";

import { Provider } from "react-redux";
import { AppStore, store } from "../common/store/Store";
import { useRef } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(store);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
