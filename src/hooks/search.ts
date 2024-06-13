"use client";

import { useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type SearchValue<T> = Record<keyof T, Nullable<string>>;

type SearchHelpers<T> = {
  push: (params: Partial<SearchValue<T>>) => void;
};

const useSearch = <T>(
  defaultValue: SearchValue<T>
): SearchValue<T> & SearchHelpers<T> => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo<SearchValue<T>>(() => {
    const params = { ...defaultValue };

    new URLSearchParams(searchParams.toString()).forEach(
      (value: string, key: string) => {
        if (defaultValue.hasOwnProperty(key)) {
          params[key as keyof T] = value;
        }
      }
    );

    return params;
  }, [searchParams, defaultValue]);

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

    const searchParams = new URLSearchParams(data).toString();

    router.push(`${pathname}${!searchParams ? "" : `?${searchParams}`}`);
  };

  return {
    push,
    ...params,
  };
};

export default useSearch;
