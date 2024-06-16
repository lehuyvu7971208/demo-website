import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useGetPostComments from "./get-post-comments";
import QueryProvider from "@/components/query-provider";
import { renderHook, waitFor } from "@testing-library/react";

const samplePostCommentResponse = {
  comments: [
    {
      id: 93,
      body: "These are fabulous ideas!",
      postId: 1,
      likes: 7,
      user: {
        id: 190,
        username: "leahw",
        fullName: "Leah Gutierrez",
      },
    },
    {
      id: 107,
      body: "You are a symbol of beauty.",
      postId: 1,
      likes: 7,
      user: {
        id: 131,
        username: "jacksonm",
        fullName: "Jackson Morales",
      },
    },
    {
      id: 209,
      body: "Your eyes are like stars.",
      postId: 1,
      likes: 10,
      user: {
        id: 95,
        username: "miless",
        fullName: "Miles Stevenson",
      },
    },
  ],
  total: 3,
  skip: 0,
  limit: 3,
};

const mockAdapter = new MockAdapter(axios);

jest.mock("@/utils/http/client", () => ({
  __esModule: true,
  default: axios,
}));

mockAdapter.onGet("/posts/1/comments").reply(200, samplePostCommentResponse);

describe("Test hook useGetPostComments", () => {
  test("Test hook useGetPostComments with default", async () => {
    const { result } = renderHook(() => useGetPostComments(1), {
      wrapper: QueryProvider,
    });

    await waitFor(() => {
      expect(result.current.data).toMatchObject(samplePostCommentResponse);
    });
  });
});
