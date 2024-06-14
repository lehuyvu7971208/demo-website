"use client";

// Utilities
import classNames from "classnames";
import { HTMLAttributes, forwardRef, useMemo } from "react";

// Components
import Image from "next/image";
import PostStatistic from "@/components/post/post-statistic";

// Types
import { GetSinglePostResponse } from "@/api/post";

type SinglePostProps = {
  data: GetSinglePostResponse;
} & HTMLAttributes<HTMLDivElement>;

const SinglePost = forwardRef<HTMLDivElement, SinglePostProps>(
  ({ data, className }, ref) => {
    const computedClassName = useMemo<string>(
      () =>
        classNames([
          className,
          `
            hover:shadow-md transition-all ease-linear
            flex flex-row p-4 bg-white gap-x-4 rounded-md 
            sm:flex-col sm:gap-y-4
          `,
        ]),
      [className]
    );

    return (
      <div ref={ref} className={computedClassName}>
        <Image
          width={100}
          height={100}
          alt={data.title}
          className={`
            sm:w-full sm:h-auto
            flex-none h-[100px] rounded-md
          `}
          src={"https://dummyjson.com/image/512"}
        />

        <div className={`flex-1 flex flex-col gap-y-2`}>
          <h3 className={`text-base font-medium line-clamp-2`}>{data.title}</h3>

          <div className={`truncate line-clamp-2 text-wrap mb-4`}>
            {data.body}
          </div>

          <PostStatistic
            views={data.views}
            likes={data.reactions.likes}
            dislikes={data.reactions.dislikes}
          />
        </div>
      </div>
    );
  }
);

SinglePost.displayName = "PostItem";

export default SinglePost;
