"use client";

// Utilities
import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";

// Components
import FormSignIn from "@/components/authenticate/components/form-sign-in";

// Hooks
import useSearch from "@/hooks/search";

// Stores
import { useAppStore } from "@/store/app-store-provider";

type SearchParams = {
  redirectUrl: Nullable<string>;
};

type SignInFormProps = {};

const SignInForm: FunctionComponent<SignInFormProps> = (props) => {
  const router = useRouter();
  const appStore = useAppStore((state) => state);

  const searchParams = useSearch<SearchParams>(
    { redirectUrl: null },
    {
      willSearchUpdate: () => true,
    }
  );

  const handleAuthenticateSuccess = (token: string) => {
    appStore.setAccessToken(token);

    router.replace(decodeURIComponent(searchParams.redirectUrl ?? "/"));
  };

  return <FormSignIn onSuccess={handleAuthenticateSuccess} />;
};

SignInForm.displayName = "LoginForm";

export default SignInForm;
