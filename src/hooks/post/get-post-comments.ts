import httpClient from "@/utils/http/client";
import { useQuery } from "@tanstack/react-query";
import postApi, {
  GetAllCommentsQuery,
  GetAllCommentsResponse,
} from "@/api/post";
import { CustomQueryOptions } from "@/components/query-provider/type";

const useGetPostComments = (
  postId: number,
  query?: GetAllCommentsQuery,
  options?: CustomQueryOptions<GetAllCommentsResponse>
) => {
  return useQuery({
    queryKey: ["post-comments", postId, query],
    queryFn: async () => {
      const response = await postApi(httpClient).getPostComments(postId, query);
      return response.data;
    },
    ...options,
  });
};

export default useGetPostComments;
