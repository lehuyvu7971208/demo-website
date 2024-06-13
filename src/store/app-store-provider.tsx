"use client";

import {
  useRef,
  useContext,
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useEffect,
} from "react";
import { StoreApi, useStore } from "zustand";
import { AppStore, createAppStore } from "./app-store";
import httpClient from "@/utils/http/client";

export const AppStoreContext = createContext<StoreApi<AppStore> | null>(null);

export type AppStoreProviderProps = PropsWithChildren & {
  accessToken?: Nullable<string>;
};

export const AppStoreProvider: FunctionComponent<AppStoreProviderProps> = ({
  children,
  accessToken,
}) => {
  const storeRef = useRef<StoreApi<AppStore>>();
  if (!storeRef.current) {
    storeRef.current = createAppStore({
      accessToken: accessToken,
    });

    if (accessToken) {
      storeRef.current.getState().getMe();
    }
  }

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const appStoreContext = useContext(AppStoreContext);

  if (!appStoreContext) {
    throw new Error(`appStoreContext must be used within AppStoreProvider`);
  }

  return useStore(appStoreContext, selector);
};
