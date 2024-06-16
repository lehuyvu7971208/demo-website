"use client";

// Utilities
import {
  ReactNode,
  useEffect,
  useCallback,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Store
import { useAppStore } from "@/store/app-store-provider";

type UnauthenticateRenderProps = {
  login: () => void;
};

type AuthenticateProps = PropsWithChildren & {
  persistence?: boolean;
  unauthenticateRender?: (props: UnauthenticateRenderProps) => ReactNode;
};

const Authenticate: FunctionComponent<AuthenticateProps> = ({
  children,
  persistence,
  unauthenticateRender,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const appStore = useAppStore((state) => state);

  const login = () => {
    const redirectUrl = encodeURIComponent(
      `${pathname}${!searchParams.toString() ? "" : `?${searchParams}`}`
    );

    if (persistence) {
      router.replace(`/auth/sign-in?redirectUrl=${redirectUrl}`, {
        scroll: false,
      });

      return;
    }
    router.push(`/auth/sign-in?redirectUrl=${redirectUrl}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    if (!appStore.accessToken && persistence) {
      login();
    }
  }, [appStore.accessToken, persistence]);

  if (appStore.accessToken) {
    return children;
  }

  if (!appStore.accessToken && !!unauthenticateRender) {
    return unauthenticateRender({ login });
  }

  return null;
};

export default Authenticate;
