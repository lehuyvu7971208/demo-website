"use client";

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
    const computedClassName = useMemo<string>(
      () => classNames([`flex flex-col gap-y-2`, className]),
      [className]
    );

    return (
      <div ref={ref} {...props} className={computedClassName}>
        <div data-testid="comment-user" className={"font-semibold"}>
          {comment.user.fullName}
        </div>

        <div data-testid="comment-body">{comment.body}</div>

        <div
          data-testid="comment-likes"
          className={`flex flex-row items-center gap-x-2`}
        >
          {comment.likes ?? 0}{" "}
          <HandThumbUpIcon width={16} className={`text-gray-400`} />
        </div>
      </div>
    );
  }
);

PostComment.displayName = "PostComment";

export default PostComment;
