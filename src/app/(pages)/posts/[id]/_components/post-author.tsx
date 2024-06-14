"use client";

// Utilities
import classNames from "classnames";
import { HTMLAttributes, forwardRef, useMemo } from "react";

// Hooks
import useGetSingleUser from "@/hooks/user/get-single-user";

type PostAuthorProps = {
  userId: number;
} & HTMLAttributes<HTMLDivElement>;

const PostAuthor = forwardRef<HTMLDivElement, PostAuthorProps>(
  ({ userId, className }, ref) => {
    const computedClassName = useMemo<string>(() => {
      return classNames([className]);
    }, [className]);

    const { data: user } = useGetSingleUser(userId, {
      enabled: !!userId,
    });

    if (!user) return null;

    return (
      <div ref={ref} className={computedClassName}>
        Tác giả:{" "}
        <span className="font-semibold">
          {user?.firstName} {user?.lastName}
        </span>
      </div>
    );
  }
);

PostAuthor.displayName = "PostAuthor";

export default PostAuthor;
