"use client";

// Utilities
import { getPage } from "@/utils";
import classNames from "classnames";
import { Component, forwardRef, useMemo } from "react";

// Components
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

type PaginateProps = {
  skip?: number;
  total?: number;
  limit?: number;
  className?: string;
  onPageChange?: (page: number) => void;
} & Omit<ReactPaginateProps, "pageCount" | "forcePage" | "onPageChange">;

const Paginate = forwardRef<Component<ReactPaginateProps>, PaginateProps>(
  (
    { skip = 0, total = 0, limit = 10, className, onPageChange, ...props },
    ref
  ) => {
    const computedClassName = useMemo<string>(
      () => classNames([`flex items-center gap-4 mx-auto`, className]),
      [className]
    );

    const forcePage = useMemo<number>(
      () => getPage(skip, limit) - 1,
      [skip, limit]
    );

    const pageCount = useMemo<number>(
      () => Math.ceil(total / limit),
      [total, limit]
    );

    const handlePageChange = (item: { selected: number }) => {
      !!onPageChange && onPageChange(item.selected + 1);
    };

    if (total === 0) return null;

    return (
      <div data-testid="pagination" className="flex flex-row">
        <ReactPaginate
          ref={ref}
          {...props}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          forcePage={forcePage}
          className={computedClassName}
          nextLabel={"Sau"}
          previousLabel={"Trước"}
          pageClassName={`w-8`}
          pageLinkClassName={`
          w-8 h-8 rounded-full 
          flex items-center justify-center 
          hover:bg-gray-300 transition-all ease-linear
        `}
          activeLinkClassName={`!bg-blue-400 !text-white`}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }
);

Paginate.displayName = "Paginate";

export default Paginate;
