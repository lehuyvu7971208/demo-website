// Utilities
import { getSkip } from "@/utils";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Hooks
import useSearch from "./search";

type SearchParams = {
  page: string;
};

const usePaginate = (limit = 10) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { page } = useSearch<SearchParams>({
    page: "1",
  });

  const skip = useMemo<number>(
    () => getSkip(parseInt(page ? page : "1"), limit),
    [page, limit]
  );

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };

  const change = (page: number) => {
    router.push(`${pathname}?${createQueryString("page", page.toString())}`);
  };

  return { skip, limit, change };
};

export default usePaginate;
