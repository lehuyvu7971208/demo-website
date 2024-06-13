import { AxiosInstance } from "axios";
import { COMMENT_PER_PAGE, POST_PER_PAGE } from "@/constants";

export type SingleCommentResponse = {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
};

export type GetSinglePostResponse = {
  id: number;
  body: string;
  title: string;
  views: number;
  tags: string[];
  userId: number;
  reactions: {
    likes: number;
    dislikes: number;
  };
};

export type GetAllPostsQuery = {
  skip?: number;
  limit?: number;

  q?: Nullable<string>;
  order?: Nullable<string>;
  sortBy?: Nullable<string>;
};

export type GetAllPostsResponse = {
  skip: number;
  total: number;
  limit: number;
  posts: GetSinglePostResponse[];
};

export type GetAllCommentsQuery = {
  skip?: number;
  total?: number;
  limit?: number;
};

export type GetAllCommentsResponse = {
  skip: number;
  total: number;
  limit: number;
  comments: SingleCommentResponse[];
};

const postApi = (http: AxiosInstance) => ({
  async getSinglePost(id: number) {
    return http.get<GetSinglePostResponse>(`/posts/${id}`);
  },

  async getPostComments(id: number, query: GetAllCommentsQuery = {}) {
    return http.get<GetAllCommentsResponse>(`/posts/${id}/comments`, {
      params: {
        skip: 0,
        limit: COMMENT_PER_PAGE,
        ...query,
      },
    });
  },

  async getAllPost(query: GetAllPostsQuery = {}) {
    const path = !query?.q ? "/posts" : "/posts/search";

    return http.get<GetAllPostsResponse>(path, {
      params: {
        skip: 0,
        limit: POST_PER_PAGE,
        ...query,
      },
    });
  },
});

export default postApi;
