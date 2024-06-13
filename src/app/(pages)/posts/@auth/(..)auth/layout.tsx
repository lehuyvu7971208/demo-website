"use client";

// Utilities
import { FunctionComponent, PropsWithChildren } from "react";

// Store
import { AuthStoreProvider } from "@/store/auth-store-provider";

type AuthLayoutProps = PropsWithChildren & {};

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ children }) => {
  return <AuthStoreProvider>{children}</AuthStoreProvider>;
};

export default AuthLayout;
