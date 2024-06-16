// Utilities
import { Metadata } from "next";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";

// Components
import QueryProvider from "@/components/query-provider";

// Store
import { AppStoreProvider } from "@/store/app-store-provider";

// Styles
import "./globals.css";

export const metadata: Metadata = {
  title: "Demo Website",
  description: "Demo Website",
};

type RootLayoutProps = PropsWithChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  const accessToken = cookies().get("accessToken")?.value;

  return (
    <html lang="en">
      <body className="text-xs text-gray-600 bg-gray-100">
        <QueryProvider>
          <AppStoreProvider accessToken={accessToken}>
            {children}
          </AppStoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
