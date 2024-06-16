"use client";

// Utilities
import { useParams } from "next/navigation";
import { FunctionComponent, useMemo } from "react";

// Components
import Image from "next/image";
import PostAuthor from "./post-author";
import PostStatistic from "@/components/post/post-statistic";

// Hooks
import useGetSinglePost from "@/hooks/post/get-single-post";

// Types
import { GetSinglePostResponse } from "@/api/post";

type PostDetailParams = {
  id: string;
};

type PostDetailProps = {
  post: Nullable<GetSinglePostResponse>;
};

const PostDetail: FunctionComponent<PostDetailProps> = (props) => {
  const params = useParams<PostDetailParams>();

  const id = useMemo(() => {
    if (!params.id) return 0;

    return parseInt(params.id);
  }, [params]);

  const { data: post } = useGetSinglePost(id, {
    initialData: props.post ?? undefined,
  });

  return (
    <div data-testid="post-detail" className="p-4 bg-white rounded-md">
      <div className="max-w-lg mx-auto">
        <Image
          width={512}
          height={512}
          alt={post?.title ?? ""}
          data-testid="post-detail-image"
          src={"https://dummyjson.com/image/512"}
          className={`max-w-lg mb-4 w-full rounded-md`}
        />

        {post?.title && (
          <h3
            data-testid="post-detail-title"
            className={`text-lg mb-2 font-semibold`}
          >
            {post?.title}
          </h3>
        )}

        {post?.body && (
          <div data-testid="post-detail-body" className={`text-xs mb-4`}>
            {post?.body}
          </div>
        )}

        {post?.userId && (
          <PostAuthor
            className="mb-4"
            userId={post?.userId}
            data-testid="post-detail-author"
          />
        )}

        <PostStatistic
          views={post?.views ?? 0}
          likes={post?.reactions.likes ?? 0}
          dislikes={post?.reactions.dislikes ?? 0}
        />
      </div>
    </div>
  );
};

export default PostDetail;
