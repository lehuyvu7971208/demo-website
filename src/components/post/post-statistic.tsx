// Utilities
import classNames from "classnames";
import { HTMLAttributes, forwardRef, useMemo } from "react";

// Components
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/16/solid";

type PostStatisticProps = {
  views: number;
  likes: number;
  dislikes: number;
} & HTMLAttributes<HTMLDivElement>;

const PostStatistic = forwardRef<HTMLDivElement, PostStatisticProps>(
  ({ className, views, likes, dislikes, ...props }, ref) => {
    const computedClassName = useMemo<string>(
      () => classNames([`flex flex-row mt-auto justify-between`, className]),
      [className]
    );

    return (
      <div ref={ref} {...props} className={computedClassName}>
        <div data-testid="views">
          Lượt xem: <span className={`text-blue-400`}>{views}</span>
        </div>

        <div className="flex flex-row flex-nowrap items-center gap-x-4">
          {!!likes && (
            <div
              data-testid="likes"
              className={`flex flex-row items-center gap-x-2`}
            >
              {likes} <HandThumbUpIcon width={16} className={`text-gray-400`} />
            </div>
          )}

          {!!dislikes && (
            <div
              data-testid="dislikes"
              className={`flex flex-row items-center gap-x-2`}
            >
              {dislikes}{" "}
              <HandThumbDownIcon width={16} className={`text-gray-400`} />
            </div>
          )}
        </div>
      </div>
    );
  }
);

PostStatistic.displayName = "PostStatistic";

export default PostStatistic;
