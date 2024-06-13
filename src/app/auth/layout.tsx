import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { AuthStoreProvider } from "@/store/auth-store-provider";
import PanelWelcome from "@/components/authenticate/components/panel-welcome";

type LayoutProps = PropsWithChildren;

export const metadata: Metadata = {
  title: "Login",
};

export default function Layout({ children }: LayoutProps) {
  return (
    <AuthStoreProvider>
      <div className="flex w-screen h-screen justify-center items-center bg-gray-100">
        <div className="p-6 w-full max-w-[320px] rounded-md shadow-md bg-white">
          <div className="flex flex-col gap-y-5">
            <PanelWelcome />

            {children}
          </div>
        </div>
      </div>
    </AuthStoreProvider>
  );
}
