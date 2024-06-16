import commentApi from "./comment";
import axios, { AxiosError } from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAdapter = new MockAdapter(axios);

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

describe("Test commentApi", () => {
  test("Test commentApi.addComment", async () => {
    mockAdapter.onPost("/comments/add").reply(200, sampleAddCommentResponse);

    const response = await commentApi(axios).addCommment({
      postId: 3,
      userId: 5,
      body: "This makes all sense to me!",
    });

    expect(response.data).toMatchObject(sampleAddCommentResponse);
  });

  test("Test commentApi.addComment fail", async () => {
    mockAdapter.onPost("/comments/add").reply(500, "Something went wrong");

    expect(
      commentApi(axios).addCommment({
        postId: 3,
        userId: 5,
        body: "This makes all sense to me!",
      })
    ).rejects.toBeInstanceOf(AxiosError);
  });
});
