import commentApi, {
  AddCommentPayload,
  AddCommentResponse,
} from "@/api/comment";
import { AxiosResponse } from "axios";
import httpClient from "@/utils/http/client";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

const useAddComment = (
  options?: UseMutationOptions<
    AxiosResponse<AddCommentResponse>,
    Error,
    AddCommentPayload
  >
) => {
  return useMutation({
    mutationKey: ["add-coment"],
    mutationFn: (payload) => {
      return commentApi(httpClient).addCommit(payload);
    },
    ...options,
  });
};

export default useAddComment;
