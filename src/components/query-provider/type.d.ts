import { UseQueryOptions } from "@tanstack/react-query";

type CustomQueryOptions<T, E = Error> = Omit<
  UseQueryOptions<T, E>,
  "queryKey" | "queryFn"
>;
