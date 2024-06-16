"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type SearchValue<T> = Record<keyof T, Nullable<string>>;

type SearchHelpers<T> = {
  push: (params: Partial<SearchValue<T>>) => void;
};

type WillSearchUpdate = (pathname: string) => boolean;

type UseSearchOptions = {
  pathname: Nullable<string>;
  willSearchUpdate: WillSearchUpdate;
};

const defaultSearchOptions: UseSearchOptions = {
  pathname: "/",
  willSearchUpdate: (pathname) =>
    !["/auth/sign-in", "/auth/sign-up"].includes(pathname),
};

const useSearch = <T>(
  defaultValue: SearchValue<T>,
  defaultOptions?: Partial<UseSearchOptions>
): SearchValue<T> & SearchHelpers<T> => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();

  const [params, setParams] = useState<SearchValue<T>>(defaultValue);

  const options = useMemo<UseSearchOptions>(
    () => ({
      ...defaultSearchOptions,
      ...defaultOptions,
    }),
    [defaultOptions]
  );

  useEffect(() => {
    /**
     * @description App is using router intercepting to open a login modal
     * and it will change searchParams. Example:
     * Current URL: /posts/?search=Hello
     * When user click "Đăng nhập" then URL will be change to /auth/sign-in
     * and make search = "" as default and re-render the page
     * To prevent it, always check the pathname
     */
    if (options.willSearchUpdate(pathname)) {
      setParams(() => {
        const params = { ...defaultValue };

        new URLSearchParams(searchParams).forEach(
          (value: string, key: string) => {
            if (defaultValue.hasOwnProperty(key)) {
              params[key as keyof T] = value;
            }
          }
        );

        return params;
      });
    }
  }, [searchParams, pathname]);

  const push = (params: Partial<SearchValue<T>>) => {
    const data = Object.entries(params).reduce<Record<string, string>>(
      (data, [key, value]) => {
        if (typeof value !== undefined && value !== null && value !== "") {
          data[key] = String(value);
        }
        return data;
      },
      {}
    );

    const nextSearchParams = new URLSearchParams(data).toString();

    router.push(
      `${options.pathname}${!nextSearchParams ? "" : `?${nextSearchParams}`}`
    );
  };

  return {
    push,
    ...params,
  };
};

export default useSearch;
