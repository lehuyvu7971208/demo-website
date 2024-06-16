"use client";

// Utilities
import {
  useMemo,
  useState,
  useEffect,
  forwardRef,
  HTMLAttributes,
} from "react";
import { getSkip } from "@/utils";
import classNames from "classnames";

// Components
import PostComment from "./post-comment";
import Paginate from "@/components/paginate";
import PostCommentEditor from "./post-comment-editor";

// Hooks
import useGetPostComments from "@/hooks/post/get-post-comments";

// Types
import { AddCommentResponse } from "@/api/comment";
import { SingleCommentResponse } from "@/api/post";

// Constant
import { COMMENT_PER_PAGE } from "@/constants";

type PostCommentsProps = {
  postId: number;
} & HTMLAttributes<HTMLDivElement>;

const PostComments = forwardRef<HTMLDivElement, PostCommentsProps>(
  ({ className, postId, ...props }, ref) => {
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [comments, setComments] = useState<SingleCommentResponse[]>([]);

    const skip = useMemo<number>(() => getSkip(page, COMMENT_PER_PAGE), [page]);

    const { data } = useGetPostComments(
      postId,
      { skip },
      {
        enabled: !!postId,
      }
    );

    useEffect(() => {
      setTotal(data?.total ?? 0);
      setComments(data?.comments ?? []);
    }, [data]);

    const computedClassName = useMemo<string>(
      () => classNames([`p-4 bg-white rounded-md`, className]),
      [className]
    );

    const handlePageChange = (page: number) => {
      setPage(page);
    };

    const handleCommentSuccess = (comment: AddCommentResponse) => {
      setTotal(total + 1);
      setComments((comments) => [
        comment as SingleCommentResponse,
        ...comments,
      ]);
    };

    return (
      <div ref={ref} className={computedClassName}>
        <div className="flex flex-col max-w-lg mx-auto gap-y-5">
          <h3 className={"text-lg font-semibold"}>
            Bình luận{" "}
            {!!total && <span data-testid="comments-total">({total})</span>}
          </h3>

          <PostCommentEditor
            postId={postId}
            data-testid="comment-editor"
            onSuccess={handleCommentSuccess}
          />

          <div className={`flex flex-col gap-y-5 mt-4`}>
            {comments.map((comment) => {
              return (
                <PostComment
                  comment={comment}
                  key={`comment_${comment.id}`}
                  data-testid={`comment-${comment.id}`}
                />
              );
            })}

            {comments.length === 0 && (
              <div data-testid="comments-empty" className="text-center">
                Chưa bình luận nào
              </div>
            )}
          </div>

          <Paginate
            skip={data?.skip}
            total={data?.total}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    );
  }
);

PostComments.displayName = "PostComments";

export default PostComments;
