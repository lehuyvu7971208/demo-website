"use client";

// Utilities
import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";

// Components
import Modal from "@/components/modal";
import FormSignUp from "@/components/authenticate/components/form-sign-up";
import PanelWelcome from "@/components/authenticate/components/panel-welcome";

// Hooks
import useSearch from "@/hooks/search";

// Store
import { useAppStore } from "@/store/app-store-provider";

type SearchParams = {
  redirectUrl: Nullable<string>;
};

type AuthSignInPageProps = {};

const AuthSignInPage: FunctionComponent<AuthSignInPageProps> = (props) => {
  const router = useRouter();
  const appStore = useAppStore((state) => state);
  const searchParams = useSearch<SearchParams>({ redirectUrl: null });

  const handleModalClose = () => {
    router.back();
  };

  const handleAuthenticateSuccess = (token: string) => {
    appStore.setAccessToken(token);

    router.replace(searchParams.redirectUrl ?? "/", {
      scroll: false,
    });

    router.refresh();
  };

  return (
    <Modal open={true} title={"Đăng nhập"} onClose={handleModalClose}>
      <div className="flex flex-col gap-y-5">
        <PanelWelcome />

        <FormSignUp onSuccess={handleAuthenticateSuccess} />
      </div>
    </Modal>
  );
};

export default AuthSignInPage;
