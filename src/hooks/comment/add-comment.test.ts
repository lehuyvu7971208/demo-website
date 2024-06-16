import axios from "axios";
import useAddComment from "./add-comment";
import MockAdapter from "axios-mock-adapter";
import QueryProvider from "@/components/query-provider";
import { renderHook, waitFor } from "@testing-library/react";

const sampleAddCommentResponse = {
  id: 341,
  postId: 3,
  body: "This makes all sense to me!",
  user: {
    id: 5,
    username: "emmaj",
    fullName: "Emma Miller",
  },
};

const mockAdapter = new MockAdapter(axios);

jest.mock("@/utils/http/client", () => ({
  __esModule: true,
  default: axios,
}));

mockAdapter.onPost("/comments/add").reply(200, sampleAddCommentResponse);

describe("Test hook addComment", () => {
  test("Test hook addComment with default", async () => {
    const onSuccessFn = jest.fn();

    const { result } = renderHook(
      () =>
        useAddComment({
          onSuccess: (response) => onSuccessFn(response.data),
        }),
      {
        wrapper: QueryProvider,
      }
    );

    result.current.mutate({
      postId: 3,
      userId: 5,
      body: "This makes all sense to me!",
    });

    await waitFor(() => {
      expect(onSuccessFn).toHaveBeenCalledWith(sampleAddCommentResponse);
    });
  });
});
