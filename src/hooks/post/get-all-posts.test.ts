import axios from "axios";
import useGetAllPosts from "./get-all-posts";
import MockAdapter from "axios-mock-adapter";
import QueryProvider from "@/components/query-provider";
import { renderHook, waitFor } from "@testing-library/react";

const sampleAllPostResponse = {
  posts: [
    {
      id: 1,
      tags: ["history", "american", "crime"],
      title: "His mother had always taught him",
      body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
      reactions: {
        likes: 192,
        dislikes: 25,
      },
      views: 305,
      userId: 121,
    },
    {
      id: 2,
      tags: ["french", "fiction", "english"],
      title: "He was an expert but not in a discipline",
      body: "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.",
      reactions: {
        likes: 859,
        dislikes: 32,
      },
      views: 4884,
      userId: 91,
    },
  ],
  total: 2,
  skip: 0,
  limit: 10,
};

const mockAdapter = new MockAdapter(axios);

jest.mock("@/utils/http/client", () => ({
  __esModule: true,
  default: axios,
}));

mockAdapter.onGet("/posts").reply(200, sampleAllPostResponse);

describe("Test hook useGetAllPosts", () => {
  test("Test hook useGetAllPosts with default", async () => {
    const { result } = renderHook(() => useGetAllPosts(), {
      wrapper: QueryProvider,
    });

    await waitFor(() => {
      expect(result.current.data).toMatchObject(sampleAllPostResponse);
    });
  });
});
