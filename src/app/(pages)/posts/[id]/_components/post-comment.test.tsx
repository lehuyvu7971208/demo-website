import PostComment from "./post-comment";
import { render } from "@testing-library/react";

const sampleComment = {
  id: 1,
  body: "This is some awesome thinking!",
  postId: 242,
  likes: 3,
  user: {
    id: 105,
    username: "emmac",
    fullName: "Emma Wilson",
  },
};

describe("Test Render <PostComent />", () => {
  test("Render <PostComent /> with full", () => {
    const { queryByTestId } = render(<PostComment comment={sampleComment} />);

    expect(queryByTestId("comment-user")).toHaveTextContent(
      sampleComment.user.fullName
    );

    expect(queryByTestId("comment-body")).toHaveTextContent(sampleComment.body);

    expect(queryByTestId("comment-likes")).toHaveTextContent(
      sampleComment.likes.toString()
    );

    expect(queryByTestId("comment-likes")?.querySelector("svg")).toBeTruthy();
  });

  test("Render <PostComent /> with no likes", () => {
    const comment = {
      ...sampleComment,
      likes: 0,
    };

    const { queryByTestId } = render(<PostComment comment={comment} />);

    expect(queryByTestId("comment-user")).toHaveTextContent(
      sampleComment.user.fullName
    );

    expect(queryByTestId("comment-body")).toHaveTextContent(sampleComment.body);

    expect(queryByTestId("comment-likes")).toHaveTextContent(/0/i);
  });

  test("Render <PostComent /> with null likes", () => {
    const comment = {
      ...sampleComment,
      likes: null,
    };

    // @ts-ignore
    const { queryByTestId } = render(<PostComment comment={comment} />);

    expect(queryByTestId("comment-user")).toHaveTextContent(
      sampleComment.user.fullName
    );

    expect(queryByTestId("comment-body")).toHaveTextContent(sampleComment.body);

    expect(queryByTestId("comment-likes")).toHaveTextContent(/0/i);
  });
});
