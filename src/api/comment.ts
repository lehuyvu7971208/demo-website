import { AxiosInstance } from "axios";

export type AddCommentPayload = {
  body: string;
  postId: number;
  userId: number;
};

export type AddCommentResponse = {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
};

const commentApi = (http: AxiosInstance) => ({
  addCommment(payload: AddCommentPayload) {
    return http.post<AddCommentResponse>("/comments/add", payload);
  },
});

export default commentApi;
