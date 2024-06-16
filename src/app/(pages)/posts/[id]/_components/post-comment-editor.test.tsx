import { useMutation } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import PostCommentEditor from "./post-comment-editor";
import QueryProvider from "@/components/query-provider";
import useAddComment from "@/hooks/comment/add-comment";
import { useAppStore } from "@/store/app-store-provider";
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

jest.mock("@/store/app-store-provider");
jest.mock("@/hooks/comment/add-comment");

describe("Test Component <PostCommentEditor />", () => {
  test("Render component <PostComponentEditor />", async () => {
    jest.mocked(useAppStore).mockImplementation(() => authMe);

    jest.mocked(useAddComment).mockImplementation((options: any) =>
      useMutation({
        mutationKey: ["add-coment"],
        mutationFn: () => ({
          data: sampleAddedComment,
        }),
        ...options,
      })
    );

    const { queryByTestId } = render(
      <QueryProvider>
        <PostCommentEditor postId={1} />
      </QueryProvider>
    );

    const textareaElement = queryByTestId("textarea");

    expect(textareaElement).not.toBeNull();
    expect(queryByTestId("user")).toBeNull();
    expect(queryByTestId("button")).toBeNull();

    if (textareaElement) {
      fireEvent.focus(textareaElement);

      expect(queryByTestId("user")).not.toBeNull();
      expect(queryByTestId("user")).toHaveTextContent(
        `${authMe.firstName} ${authMe.lastName}`
      );

      expect(queryByTestId("button")).not.toBeNull();
      expect(
        queryByTestId("button")?.getAttribute("type") === "submit"
      ).toBeTruthy();

      const submitButton = queryByTestId("button");
      if (submitButton) {
        fireEvent.click(submitButton);
        await waitFor(() => {
          expect(queryByTestId("textarea-body-error")).not.toBeNull();
          expect(queryByTestId("textarea-body-error")).toHaveTextContent(
            "Bạn chưa nhập nội dung bình luận."
          );
        });
      }
    }
  });

  test("Render component <PostComponentEditor /> submit", async () => {
    const user = userEvent.setup();
    const handleCommentAdd = jest.fn();

    jest.mocked(useAppStore).mockImplementation(() => authMe);

    jest.mocked(useAddComment).mockImplementation((options: any) =>
      useMutation({
        mutationKey: ["add-comment"],
        mutationFn: () => ({
          data: sampleAddedComment,
        }),
        ...options,
      })
    );

    const { queryByTestId } = render(
      <QueryProvider>
        <PostCommentEditor postId={1} onSuccess={handleCommentAdd} />
      </QueryProvider>
    );

    fireEvent.focus(screen.getByTestId("textarea"));

    await user.type(screen.getByTestId("textarea"), "Hello world");
    await user.click(screen.getByTestId("button"));

    expect(queryByTestId("textarea-body-error")).toBeNull();
    expect(handleCommentAdd).toHaveBeenCalledWith(sampleAddedComment);
  });

  test("Render component <PostComponentEditor /> submit error", async () => {
    const user = userEvent.setup();

    jest.mocked(useAppStore).mockImplementation(() => authMe);

    jest.mocked(useAddComment).mockImplementation((options: any) =>
      useMutation({
        mutationKey: ["add-coment"],
        mutationFn: () => {
          throw new Error();
        },
        ...options,
      })
    );

    const { queryByTestId } = render(
      <QueryProvider>
        <PostCommentEditor postId={1} />
      </QueryProvider>
    );

    fireEvent.focus(screen.getByTestId("textarea"));

    await user.type(screen.getByTestId("textarea"), "Hello world");
    await user.click(screen.getByTestId("button"));

    await waitFor(() => {
      expect(queryByTestId("error")).not.toBeNull();
      expect(queryByTestId("error")).toHaveTextContent(
        "Đã có lỗi xảy ra! Vui lòng thử lại"
      );
    });
  });

  test("Render component <PostComponentEditor /> unauthenticated", async () => {
    jest.mocked(useAppStore).mockImplementation(() => null);

    jest.mocked(useAddComment).mockImplementation((options: any) =>
      useMutation({
        mutationKey: ["add-coment"],
        mutationFn: () => {
          throw new Error();
        },
        ...options,
      })
    );

    const { queryByTestId } = render(
      <QueryProvider>
        <PostCommentEditor postId={1} />
      </QueryProvider>
    );

    expect(queryByTestId("form")).toBeNull();
  });
});
