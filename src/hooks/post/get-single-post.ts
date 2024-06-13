import httpClient from "@/utils/http/client";
import { useQuery } from "@tanstack/react-query";
import postApi, { GetSinglePostResponse } from "@/api/post";
import { CustomQueryOptions } from "@/components/query-provider/type";

const useGetSinglePost = (
  id: number,
  options?: CustomQueryOptions<GetSinglePostResponse>
) =>
  useQuery({
    queryKey: ["single-post", id],
    queryFn: async () => {
      const response = await postApi(httpClient).getSinglePost(id);
      return response.data;
    },
    ...options,
  });

export default useGetSinglePost;
