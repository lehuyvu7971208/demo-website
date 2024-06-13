import { useAppStore } from "@/store/app-store-provider";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const useAuthenticateQuery = <T, E>(options: UseQueryOptions<T, E>) => {
  const accessToken = useAppStore((state) => state.accessToken);

  return useQuery({
    ...options,
    enabled:
      !!accessToken && typeof options.enabled !== "undefined"
        ? options.enabled
        : true,
  });
};

export default useAuthenticateQuery;
