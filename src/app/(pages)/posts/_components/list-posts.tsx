"use client";

// Utilities
import { HTMLAttributes, forwardRef, useMemo } from "react";

// Components
import Link from "next/link";
import SinglePost from "./single-post";

// Types
import { GetSinglePostResponse } from "@/api/post";
import classNames from "classnames";

type ListPostProps = HTMLAttributes<HTMLDivElement> & {
  posts: GetSinglePostResponse[];
};

const ListPosts = forwardRef<HTMLDivElement, ListPostProps>(
  ({ posts, className, ...props }, ref) => {
    const computedClassName = useMemo<string>(
      () =>
        classNames([
          className,
          `flex flex-row flex-wrap m-[-0.5rem] items-stretch justify-stretch`,
        ]),
      [className]
    );

    if (posts.length === 0) {
      return (
        <div
          data-testid="posts-empty"
          className="p-4 w-full text-center bg-white rounded shadow-sm"
        >
          Không có bài viết!
        </div>
      );
    }

    return (
      <div
        {...props}
        ref={ref}
        data-testid="posts"
        className={computedClassName}
      >
        {posts.map((post) => (
          <div
            data-testid="item"
            key={`post_${post.id}`}
            className={`flex-0 w-full p-2 sm:w-1/2 lg:w-1/4 xl:w-1/5`}
          >
            <Link
              href={`/posts/[id]`}
              as={`/posts/${post.id}`}
              className="block h-full"
              data-testid={`link-${post.id}`}
            >
              <SinglePost data={post} className="h-full" />
            </Link>
          </div>
        ))}
      </div>
    );
  }
);

ListPosts.displayName = "ListPosts";

export default ListPosts;
