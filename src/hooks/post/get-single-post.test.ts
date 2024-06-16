import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useGetSinglePost from "./get-single-post";
import QueryProvider from "@/components/query-provider";
import { renderHook, waitFor } from "@testing-library/react";

const sampleSinglePostResponse = {
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
};

const mockAdapter = new MockAdapter(axios);

jest.mock("@/utils/http/client", () => ({
  __esModule: true,
  default: axios,
}));

mockAdapter.onGet("/posts/1").reply(200, sampleSinglePostResponse);

describe("Test hook useGetSinglePost", () => {
  test("Test hook useGetSinglePost with default", async () => {
    const { result } = renderHook(() => useGetSinglePost(1), {
      wrapper: QueryProvider,
    });

    await waitFor(() => {
      expect(result.current.data).toMatchObject(sampleSinglePostResponse);
    });
  });
});
