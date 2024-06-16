"use client";

// Utilities
import { FunctionComponent, useMemo } from "react";

// Components
import ListPosts from "./list-posts";
import Paginate from "@/components/paginate";
import SortPosts, { SortValues } from "./sort-posts";

// Hooks
import useSearch from "@/hooks/search";
import useGetAllPosts from "@/hooks/post/get-all-posts";

// Types
import { GetAllPostsResponse, GetSinglePostResponse } from "@/api/post";

// Hooks
import usePaginate from "@/hooks/paginate";

const defaultSearchParams = {
  order: null,
  sortBy: null,
  search: null,
};

type SearchParams = {
  order: Nullable<string>;
  sortBy: Nullable<string>;
  search: Nullable<string>;
};

type AllPostsProps = {
  data?: Nullable<GetAllPostsResponse>;
};

const AllPosts: FunctionComponent<AllPostsProps> = (props) => {
  const { skip, limit, change } = usePaginate();

  const { search, order, sortBy, push } =
    useSearch<SearchParams>(defaultSearchParams);

  const { data } = useGetAllPosts(
    { skip, limit, order, sortBy, q: search },
    {
      initialData: props.data ?? undefined,
    }
  );

  const posts = useMemo<GetSinglePostResponse[]>(
    () => data?.posts ?? [],
    [data]
  );

  const sort = useMemo<SortValues>(() => ({ order, sortBy }), [order, sortBy]);

  const handleSortChange = (
    sortBy: Nullable<string>,
    order: Nullable<string>
  ) => {
    push({ order, sortBy, search });
  };

  const handlePageChange = (page: number) => {
    change(page);
  };

  return (
    <div className={`flex flex-col gap-y-4`}>
      <div className="flex flex-row items-center">
        {search && (
          <div data-testid="search-posts">
            Có{" "}
            <span data-testid="search-posts-total" className={`font-semibold`}>
              {data?.total ?? 0}
            </span>{" "}
            kết quả, theo từ khóa tìm kiếm{" "}
            <span
              data-testid="search-posts-keyword"
              className={`font-semibold`}
            >
              {search}
            </span>
          </div>
        )}

        <div className="ml-auto" data-testid="sort-posts">
          <SortPosts value={sort} onSortChange={handleSortChange} />
        </div>
      </div>

      <ListPosts posts={posts} data-testid="posts" />

      <Paginate
        skip={data?.skip}
        total={data?.total}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllPosts;
