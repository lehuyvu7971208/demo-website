import httpClient from "@/utils/http/client";
import { useQuery } from "@tanstack/react-query";
import { CustomQueryOptions } from "@/components/query-provider/type";
import postApi, { GetAllPostsQuery, GetAllPostsResponse } from "@/api/post";

const useGetAllPosts = (
  query: GetAllPostsQuery = {},
  options?: CustomQueryOptions<GetAllPostsResponse>
) =>
  useQuery({
    queryKey: ["all-post", {...query}],
    queryFn: async () => {
      const response = await postApi(httpClient).getAllPost(query);
      return response.data;
    },
    ...options,
  });

export default useGetAllPosts;
