import ListPosts from "./list-posts";
import { render } from "@testing-library/react";
import { GetSinglePostResponse } from "@/api/post";

const samplePosts: GetSinglePostResponse[] = [
  {
    id: 1,
    title: "His mother had always taught him",
    body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
    tags: ["history", "american", "crime"],
    reactions: {
      likes: 192,
      dislikes: 25,
    },
    views: 305,
    userId: 121,
  },
  {
    id: 2,
    title: "He was an expert but not in a discipline",
    body: "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.",
    tags: ["french", "fiction", "english"],
    reactions: {
      likes: 859,
      dislikes: 32,
    },
    views: 4884,
    userId: 91,
  },
];

describe("Test Component <ListPosts />", () => {
  test("Render <ListPosts /> with posts", () => {
    const { queryAllByTestId, queryByTestId } = render(
      <ListPosts posts={samplePosts} />
    );

    expect(queryByTestId("posts-empty")).toBeNull();
    expect(queryAllByTestId("item").length === samplePosts.length).toBeTruthy();

    samplePosts.forEach(({ id }) => {
      expect(
        queryByTestId(`link-${id}`)?.getAttribute("href") === `/posts/${id}`
      ).toBeTruthy();
    });
  });

  test("Render <ListPosts /> with empty posts", () => {
    const { queryByTestId } = render(<ListPosts posts={[]} />);

    expect(queryByTestId("posts")).toBeNull();
    expect(queryByTestId("posts-empty")).toHaveTextContent(
      "Không có bài viết!"
    );
  });
});
