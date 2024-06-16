import React from "react";
import PostComments from "./post-comments";
import userEvent from "@testing-library/user-event";
import QueryProvider from "@/components/query-provider";
import useAddComment from "@/hooks/comment/add-comment";
import { useAppStore } from "@/store/app-store-provider";
import { useMutation, useQuery } from "@tanstack/react-query";
import useGetPostComments from "@/hooks/post/get-post-comments";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";

const authMe = {
  id: 1,
  gender: "female",
  username: "emilys",
  firstName: "Emily",
  lastName: "Johnson",
  email: "emily.johnson@x.dummyjson.com",
};

const sampleAddedComment = {
  id: 341,
  body: "This makes all sense to me!",
  postId: 3,
  user: {
    id: 5,
    username: "emmaj",
    fullName: "Emma Miller",
  },
};

const samplePostCommentsData = {
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
  skip: 0,
  limit: 10,
  total: 100,
};

jest.mock("@/store/app-store-provider");
jest.mock("@/hooks/post/get-post-comments");

jest.mock("@/hooks/comment/add-comment", () => ({
  __esModule: true,
  default: jest.fn((options: any) =>
    useMutation({
      mutationKey: ["add-comment"],
      mutationFn: () => ({
        data: sampleAddedComment,
      }),
      ...options,
    })
  ),
}));

const fetchPostCommentsFn = jest.fn(() => samplePostCommentsData);

const useGetPostCommentsFn = jest.fn(
  (postId: number, query: any, options: any): any =>
    useQuery({
      queryFn: fetchPostCommentsFn,
      queryKey: ["post-comments", postId, query],
      ...options,
    })
);

describe("Test Component <PostComments />", () => {
  test("Render Component <PostComments /> with comments", async () => {
    jest.mocked(useAppStore).mockImplementation(() => authMe);
    jest.mocked(useGetPostComments).mockImplementation(useGetPostCommentsFn);

    const { queryByTestId } = render(
      <QueryProvider>
        <PostComments postId={1} />
      </QueryProvider>
    );

    await waitFor(async () => {
      expect(queryByTestId("comments-total")).not.toBeNull();
      expect(queryByTestId("comments-total")).toHaveTextContent(/100/i);

      expect(queryByTestId("comments-empty")).toBeNull();

      expect(queryByTestId("pagination")).not.toBeNull();
    });
  });

  test("Render Component <PostComments /> with pagination change", async () => {
    jest.mocked(useAppStore).mockImplementation(() => authMe);
    jest.mocked(useGetPostComments).mockImplementation(useGetPostCommentsFn);

    const { queryByTestId } = render(
      <QueryProvider>
        <PostComments postId={1} />
      </QueryProvider>
    );

    await waitFor(async () => {
      expect(queryByTestId("pagination")).not.toBeNull();
      const buttons =
        queryByTestId("pagination")?.querySelectorAll('[role="button"]');

      expect(buttons?.length && buttons.length > 0).toBeTruthy();

      if (buttons?.length && buttons.length > 0) {
        await userEvent.click(buttons[2]);
        expect(fetchPostCommentsFn).toHaveBeenCalled();
      }
    });
  });

  test("Render Component <PostComments /> with add comment", async () => {
    const user = userEvent.setup();

    jest.mocked(useAppStore).mockImplementation(() => authMe);
    jest.mocked(useGetPostComments).mockImplementation(useGetPostCommentsFn);

    const { queryByTestId } = render(
      <QueryProvider>
        <PostComments postId={1} />
      </QueryProvider>
    );

    await waitFor(async () => {
      fireEvent.focus(screen.getByTestId("textarea"));

      await user.type(screen.getByTestId("textarea"), "Hello world");
      await user.click(screen.getByTestId("button"));

      await waitFor(async () => {
        expect(
          queryByTestId(`comment-${sampleAddedComment.id}`)
        ).not.toBeNull();
      });
    });
  });
});
