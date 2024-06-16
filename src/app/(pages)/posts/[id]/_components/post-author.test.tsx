import PostAuthor from "./post-author";
import { useQuery } from "@tanstack/react-query";
import { GetSingleUserResponse } from "@/api/user";
import QueryProvider from "@/components/query-provider";
import { render, waitFor } from "@testing-library/react";

const sampleUser: GetSingleUserResponse = {
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

jest.mock("@/hooks/user/get-single-user", () => ({
  __esModule: true,
  default: jest.fn((id, options) =>
    useQuery({
      queryFn: () => sampleUser,
      queryKey: ["post-author", id],
      ...options,
    })
  ),
}));

describe("Test component <PostAuthor/>", () => {
  test("Render component <PostAuthor/> with userId", async () => {
    const { queryByTestId } = render(
      <QueryProvider>
        <PostAuthor userId={sampleUser.id} />
      </QueryProvider>
    );

    await waitFor(() => expect(queryByTestId("author")).not.toBeNull());
    await waitFor(() =>
      expect(queryByTestId("author-name")).toHaveTextContent(
        `${sampleUser.firstName} ${sampleUser.lastName}`
      )
    );
  });

  test("Render component <PostAuthor/> with no userId", () => {
    const { queryByTestId } = render(
      <QueryProvider>
        <PostAuthor userId={0} />
      </QueryProvider>
    );

    expect(queryByTestId("author")).toBeNull();
  });
});
