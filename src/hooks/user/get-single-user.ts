import httpClient from "@/utils/http/client";
import { useQuery } from "@tanstack/react-query";
import userApi, { GetSingleUserResponse } from "@/api/user";
import { CustomQueryOptions } from "@/components/query-provider/type";

const useGetSingleUser = (
  id: number,
  options?: CustomQueryOptions<GetSingleUserResponse>
) => {
  return useQuery({
    queryKey: ["single-user", id],
    queryFn: async () => {
      const response = await userApi(httpClient).getSingleUser(id);
      return response.data;
    },
    ...options,
  });
};

export default useGetSingleUser;
