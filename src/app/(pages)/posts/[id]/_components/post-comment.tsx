'use client'

// Utilities
import classNames from "classnames";
import { HTMLAttributes, forwardRef, useMemo } from "react";

// Components
import { HandThumbUpIcon } from "@heroicons/react/16/solid";

// Types
import { SingleCommentResponse } from "@/api/post";

type PostCommentProps = {
  comment: SingleCommentResponse;
} & HTMLAttributes<HTMLDivElement>;

const PostComment = forwardRef<HTMLDivElement, PostCommentProps>(
  ({ className, comment, ...props }, ref) => {
    const computedClassName = useMemo(
      () => classNames([`flex flex-col gap-y-2`, className]),
      [className]
    );

    return (
      <div ref={ref} {...props} className={computedClassName}>
        <div className={"font-semibold"}>{comment.user.fullName}</div>

        <div>{comment.body}</div>

        <div className={`flex flex-row items-center gap-x-2`}>
          {comment.likes ?? 0}{" "}
          <HandThumbUpIcon width={16} className={`text-gray-400`} />
        </div>
      </div>
    );
  }
);

PostComment.displayName = "PostComment";

export default PostComment;
