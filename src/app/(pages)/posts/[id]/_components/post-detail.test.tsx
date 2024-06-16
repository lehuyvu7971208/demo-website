import useGetSinglePost from "@/hooks/post/get-single-post";
import { useQuery } from "@tanstack/react-query";
import { render, waitFor } from "@testing-library/react";
import PostDetail from "./post-detail";
import useGetSingleUser from "@/hooks/user/get-single-user";
import QueryProvider from "@/components/query-provider";
import { useParams } from "next/navigation";

const samplePostData = {
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
};

jest.mock("@/hooks/post/get-single-post");

const samplePostAuthorData = {
  id: 1,
  age: 28,
  image: "...",
  gender: "female",
  firstName: "Emily",
  username: "emilys",
  lastName: "Johnson",
  maidenName: "Smith",
  birthDate: "1996-5-30",
  phone: "+81 965-431-3024",
  email: "emily.johnson@x.dummyjson.com",
};

jest.mock("@/hooks/user/get-single-user");

jest.mock("next/navigation");

const fetchNoDetailData = jest.fn(() => null);
const fetchPostDetailData = jest.fn(() => samplePostData);
const fetchPostDetailAuthor = jest.fn(() => samplePostAuthorData);

describe("Test Component <PostDetail />", () => {
  test("Render Component <PostDetail /> with default", async () => {
    jest.mocked(useParams).mockImplementation(() => ({
      id: samplePostData.id.toString(),
    }));

    jest
      .mocked(useGetSinglePost)
      .mockImplementation((id: number, options: any) =>
        useQuery({
          queryFn: fetchPostDetailData,
          queryKey: ["single-post", id],
          ...options,
        })
      );

    jest
      .mocked(useGetSingleUser)
      .mockImplementation((id: number, options: any) =>
        useQuery({
          queryFn: fetchPostDetailAuthor,
          queryKey: ["post-author", id],
          ...options,
        })
      );

    const { queryByTestId } = render(
      <QueryProvider>
        <PostDetail post={null} />
      </QueryProvider>
    );

    await waitFor(() => {
      expect(queryByTestId("post-detail-body")).not.toBeNull();
      expect(queryByTestId("post-detail-image")).not.toBeNull();
      expect(queryByTestId("post-detail-title")).not.toBeNull();
      expect(queryByTestId("post-detail-author")).not.toBeNull();
    });
  });

  test("Render Component <PostDetail /> with no detail", async () => {
    jest.mocked(useParams).mockImplementation(() => ({
      id: "",
    }));

    jest
      .mocked(useGetSinglePost)
      .mockImplementation((id: number, options: any) =>
        useQuery({
          queryFn: fetchNoDetailData,
          queryKey: ["single-post", id],
          ...options,
        })
      );

    const { queryByTestId } = render(
      <QueryProvider>
        <PostDetail post={null} />
      </QueryProvider>
    );

    await waitFor(() => {
      expect(queryByTestId("post-detail-body")).toBeNull();
      expect(queryByTestId("post-detail-title")).toBeNull();
      expect(queryByTestId("post-detail-author")).toBeNull();
    });
  });
});
