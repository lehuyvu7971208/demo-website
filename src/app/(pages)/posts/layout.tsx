"use client";

// Utilities
import { PropsWithChildren, ReactNode, useMemo } from "react";

// Components
import Header from "./_components/header";

type PageLayoutProps = PropsWithChildren & {
  auth: ReactNode;
};

export default function PageLayout({ auth, children }: PageLayoutProps) {
  return (
    <div className="container mx-auto px-2 py-3 flex flex-col gap-y-3">
      <div className="flex-0">
        <Header />
      </div>

      <div className="flex-0">{children}</div>

      {auth}
    </div>
  );
}
