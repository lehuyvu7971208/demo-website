"use client";

// Utilities
import classNames from "classnames";
import { HTMLAttributes, forwardRef, useMemo } from "react";

type SinglePostPlaceholderProps = HTMLAttributes<HTMLDivElement>;

const SinglePostPlaceholder = forwardRef<
  HTMLDivElement,
  SinglePostPlaceholderProps
>(({ className }, ref) => {
  const computedClassName = useMemo<string>(
    () =>
      classNames([
        className,
        `
          sm:flex-col sm:gap-y-4 animate-pulse
          hover:shadow-md transition-all ease-linear
          flex flex-row p-4 bg-white gap-x-4 rounded-md 
        `,
      ]),
    [className]
  );

  return (
    <div ref={ref} className={computedClassName}>
      <div
        className={`
          sm:w-full flex-none rounded-md sm:pt-[100%]
          w-[100px] mb-4 max-w-lg bg-slate-200 
        `}
      ></div>

      <div className={`flex-1 flex flex-col gap-y-2`}>
        <h3 className={`w-3/4 h-7 mb-2 bg-slate-200 rounded-md`}></h3>

        <div className={`h-4 mb-1/2 bg-slate-200 rounded-md`}></div>
        <div className={`h-4 mb-2 w-3/4 bg-slate-200 rounded-md`}></div>

        <div className={`flex flex-col gap-y-2`}>
          <div className={`h-4 w-1/3 bg-slate-200 rounded-md`}></div>
        </div>
      </div>
    </div>
  );
});

SinglePostPlaceholder.displayName = "PostItem";

export default SinglePostPlaceholder;
