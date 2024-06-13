"use client";

import {
  useRef,
  useContext,
  createContext,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import { StoreApi, useStore } from "zustand";
import { AuthStore, createAuthStore } from "./auth-store";

export const AuthStoreContext = createContext<StoreApi<AuthStore> | null>(null);

export type AuthStoreProviderProps = PropsWithChildren;

export const AuthStoreProvider: FunctionComponent<AuthStoreProviderProps> = ({
  children,
}) => {
  const storeRef = useRef<StoreApi<AuthStore>>();
  if (!storeRef.current) {
    storeRef.current = createAuthStore();
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error(`authStoreContext must be used within AuthStoreProvider`);
  }

  return useStore(authStoreContext, selector);
};
