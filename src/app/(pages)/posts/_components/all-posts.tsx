"use client";

// Utilities
import useSearch from "@/hooks/search";
import { FunctionComponent, useMemo } from "react";

// Components
import Link from "next/link";
import SortPosts from "./sort-posts";
import SinglePost from "./single-post";
import Paginate from "@/components/paginate";

// Hooks
import useGetAllPosts from "@/hooks/post/get-all-posts";

// Types
import { GetAllPostsResponse } from "@/api/post";

// Hooks
import usePaginate from "@/hooks/paginate";

type SearchParams = {
  order: Nullable<string>;
  sortBy: Nullable<string>;
  search: Nullable<string>;
};

type AllPostsProps = {
  data: Nullable<GetAllPostsResponse>;
};

const AllPosts: FunctionComponent<AllPostsProps> = (props) => {
  const { skip, limit, change } = usePaginate();

  const { search, order, sortBy, push } = useSearch<SearchParams>({
    order: null,
    sortBy: null,
    search: null,
  });

  const { data } = useGetAllPosts(
    { skip, limit, order, sortBy, q: search },
    {
      initialData: props.data ?? undefined,
    }
  );

  const posts = useMemo(() => data?.posts ?? [], [data]);

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
      <div className="flex flex-row items-centers">
        {search && (
          <div>
            Có <span className={`font-semibold`}>{data?.total}</span> kết quả,
            theo từ khóa tìm kiếm{" "}
            <span className={`font-semibold`}>{search}</span>
          </div>
        )}

        <SortPosts className="ml-auto" onSortChange={handleSortChange} />
      </div>

      <div
        className={`flex flex-row flex-wrap m-[-0.5rem] items-stretch justify-stretch`}
      >
        {posts.map((post) => (
          <div
            key={`post_${post.id}`}
            className={`flex-0 w-full p-2 sm:w-1/2 lg:w-1/4 xl:w-1/5`}
          >
            <Link
              href={`/posts/[id]`}
              as={`/posts/${post.id}`}
              className="block h-full"
            >
              <SinglePost data={post} className="h-full" />
            </Link>
          </div>
        ))}
      </div>

      <Paginate
        skip={data?.skip}
        total={data?.total}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllPosts;
