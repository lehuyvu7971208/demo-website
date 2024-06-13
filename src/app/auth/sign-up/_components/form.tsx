"use client";

// Utilities
import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";

// Components
import FormSignUp from "@/components/authenticate/components/form-sign-up";

// Hooks
import useSearch from "@/hooks/search";

// Store
import { useAppStore } from "@/store/app-store-provider";

type SearchParams = {
  redirectUrl: Nullable<string>;
};

type SignUpFormProps = {};

const SignUpForm: FunctionComponent<SignUpFormProps> = (props) => {
  const router = useRouter();
  const appStore = useAppStore((state) => state);
  const searchParams = useSearch<SearchParams>({ redirectUrl: null });

  const handleAuthenticateSuccess = (token: string) => {
    appStore.setAccessToken(token);

    router.replace(searchParams.redirectUrl ?? "/");
  };

  return <FormSignUp onSuccess={handleAuthenticateSuccess} />;
};

export default SignUpForm;
