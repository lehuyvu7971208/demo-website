import postApi from "./post";
import axios, { AxiosError } from "axios";
import MockAdapter from "axios-mock-adapter";

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

const sampleSearchPostResponse = {
  posts: [
    {
      id: 5,
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
      id: 6,
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

beforeEach(() => {
  mockAdapter.onGet("/posts").reply(200, sampleAllPostResponse);
  mockAdapter.onGet("/posts/1").reply(200, sampleSinglePostResponse);
  mockAdapter.onGet("/posts/search").reply(200, sampleSearchPostResponse);
  mockAdapter.onGet("/posts/1/comments").reply(200, samplePostCommentResponse);
});

describe("Test postApi", () => {
  test("Test postApi.getAllPost get all post", async () => {
    const response = await postApi(axios).getAllPost({
      skip: 0,
    });

    expect(response.data).toMatchObject(sampleAllPostResponse);
  });

  test("Test postApi.getAllPost search all post", async () => {
    const response = await postApi(axios).getAllPost({
      skip: 0,
      q: "hello",
    });

    expect(response.data).toMatchObject(sampleSearchPostResponse);
  });

  test("Test postApi.getAllPost fail", async () => {
    mockAdapter.onGet("/posts").reply(500, "Something went wrong");

    expect(postApi(axios).getAllPost()).rejects.toBeInstanceOf(AxiosError);
  });

  test("Test postApi.getPostComments", async () => {
    const response = await postApi(axios).getPostComments(1);
    expect(response.data).toMatchObject(samplePostCommentResponse);
  });

  test("Test postApi.getPostComments fail", async () => {
    mockAdapter.onGet("/posts/1/comments").reply(500, "Something went wrong");

    expect(postApi(axios).getPostComments(1)).rejects.toBeInstanceOf(
      AxiosError
    );
  });

  test("Test postApi.getSinglePost", async () => {
    const response = await postApi(axios).getSinglePost(1);
    expect(response.data).toMatchObject(sampleSinglePostResponse);
  });

  test("Test postApi.getSinglePost fail", async () => {
    mockAdapter.onGet("/posts/1").reply(500, "Something went wrong");
    expect(postApi(axios).getSinglePost(1)).rejects.toBeInstanceOf(AxiosError);
  });
});
