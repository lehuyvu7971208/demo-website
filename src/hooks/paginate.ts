// Utilities
import { useMemo } from "react";
import { getSkip } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const usePaginate = (limit = 10) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo<URLSearchParams>(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  const page = useMemo<number>(
    () => parseInt(params.get("page") ?? "1"),
    [params]
  );

  const skip = useMemo<number>(() => getSkip(page, limit), [page, limit]);

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
