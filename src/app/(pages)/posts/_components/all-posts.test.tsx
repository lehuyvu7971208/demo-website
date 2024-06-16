import AllPosts from "./all-posts";
import useSearch from "@/hooks/search";
import usePaginate from "@/hooks/paginate";
import { POST_SORT_OPTIONS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import useGetAllPosts from "@/hooks/post/get-all-posts";
import QueryProvider from "@/components/query-provider";
import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const samplePostData = {
  skip: 0,
  total: 2,
  limit: 10,
  posts: [
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
  ],
};

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    push: () => null,
  }),
  usePathname: () => "",
  useSearchParams: () => new URLSearchParams({}),
}));

const paginationChange = jest.fn();
jest.mock("@/hooks/paginate", () => ({
  __esModule: true,
  default: () => ({
    skip: 0,
    limit: 10,
    change: paginationChange,
  }),
}));

jest.mock("@/hooks/search");
jest.mock("@/hooks/post/get-all-posts");

const useSearchFn = () => ({
  order: null,
  sortBy: null,
  search: null,
  push: () => null,
});

const useGetAllPostsFn = jest.fn((data: any, options: any): any =>
  useQuery({
    queryFn: () => samplePostData,
    queryKey: ["all-posts", { ...data }],
    ...options,
  })
);

describe("Test Component <AllPosts />", () => {
  test("Render Component <AllPosts /> with posts", async () => {
    jest.mocked(useSearch).mockImplementation(useSearchFn);

    jest.mocked(useGetAllPosts).mockImplementation(useGetAllPostsFn);

    const { queryByTestId, debug } = render(
      <QueryProvider>
        <AllPosts />
      </QueryProvider>
    );

    debug();

    await waitFor(() => {
      expect(queryByTestId("posts")).not.toBeNull();
      expect(queryByTestId("sort-posts")).not.toBeNull();
      expect(queryByTestId("pagination")).not.toBeNull();
    });
  });

  test("Render Component <AllPosts /> with search", () => {
    jest.mocked(useSearch).mockImplementation(() => ({
      order: null,
      sortBy: null,
      search: "Hello World",
      push: () => null,
    }));

    jest.mocked(useGetAllPosts).mockImplementation(useGetAllPostsFn);

    const { queryByTestId } = render(
      <QueryProvider>
        <AllPosts />
      </QueryProvider>
    );

    expect(queryByTestId("search-posts")).not.toBeNull();
    expect(queryByTestId("search-posts")).toHaveTextContent(
      /kết quả, theo từ khóa tìm kiếm/i
    );
  });

  test("Render Component <AllPosts /> with search empty posts", async () => {
    jest.mocked(useSearch).mockImplementation(() => ({
      order: null,
      sortBy: null,
      search: "Hello World",
      push: () => null,
    }));

    jest.mocked(useGetAllPosts).mockImplementation((data: any, options: any) =>
      useQuery({
        queryKey: ["all-posts"],
        queryFn: () => ({
          ...samplePostData,
          total: null,
        }),
        ...options,
      })
    );

    const { queryByTestId } = render(
      <QueryProvider>
        <AllPosts />
      </QueryProvider>
    );

    await waitFor(() => {
      expect(queryByTestId("search-posts")).not.toBeNull();
      expect(queryByTestId("search-posts")).toHaveTextContent(
        /kết quả, theo từ khóa tìm kiếm/i
      );

      expect(queryByTestId("search-posts-total")).toHaveTextContent(/0/i);
      expect(queryByTestId("search-posts-keyword")).toHaveTextContent(
        /hello world/i
      );
    });
  });

  test("Render Component <AllPosts /> with empty posts", async () => {
    jest.mocked(useSearch).mockImplementation(useSearchFn);

    jest.mocked(useGetAllPosts).mockImplementation((data: any, options: any) =>
      useQuery({
        queryKey: ["all-posts"],
        queryFn: () => ({ ...samplePostData, total: 0, posts: [] }),
        ...options,
      })
    );

    const { queryByTestId } = render(
      <QueryProvider>
        <AllPosts />
      </QueryProvider>
    );

    await waitFor(() => {
      expect(queryByTestId("pagination")).toBeNull();
      expect(queryByTestId("posts-empty")).not.toBeNull();
    });
  });

  test("Render Component <AllPosts /> with sort posts", async () => {
    const searchPush = jest.fn();

    jest.mocked(useSearch).mockImplementation(() => ({
      order: null,
      sortBy: null,
      search: null,
      push: searchPush,
    }));

    jest.mocked(useGetAllPosts).mockImplementation(useGetAllPostsFn);

    const { queryByTestId, queryAllByTestId } = render(
      <QueryProvider>
        <AllPosts />
      </QueryProvider>
    );

    await waitFor(() => {
      const toggleElement = queryByTestId("sort-toggle");

      if (toggleElement) {
        POST_SORT_OPTIONS.forEach(async ({ values }, index) => {
          fireEvent.click(toggleElement);

          const sortLinks = queryAllByTestId("sort-link");
          fireEvent.click(sortLinks[index]);

          expect(searchPush).toHaveBeenCalledWith({
            search: null,
            order: values.order,
            sortBy: values.sortBy,
          });
        });
      }
    });
  });

  test("Render Component <AllPosts /> with change pagination", async () => {
    jest.mocked(useSearch).mockImplementation(() => ({
      order: null,
      sortBy: null,
      search: null,
      push: () => null,
    }));

    jest.mocked(useGetAllPosts).mockImplementation((data: any, options: any) =>
      useQuery({
        queryKey: ["all-posts"],
        queryFn: () => ({ ...samplePostData, skip: 0, limit: 10, total: 100 }), // 10 pages
        ...options,
      })
    );

    const { queryByTestId, queryAllByTestId } = render(
      <QueryProvider>
        <AllPosts />
      </QueryProvider>
    );

    await waitFor(async () => {
      expect(queryByTestId("pagination")).not.toBeNull();
      const buttons =
        queryByTestId("pagination")?.querySelectorAll('[role="button"]');

      expect(buttons?.length && buttons.length > 0).toBeTruthy();

      if (buttons?.length && buttons.length > 0) {
        await userEvent.click(buttons[2]);
        expect(paginationChange).toHaveBeenCalled();
      }
    });
  });
});
