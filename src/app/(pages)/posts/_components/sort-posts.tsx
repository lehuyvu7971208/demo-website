"use client";

// Utilities
import classNames from "classnames";
import { FunctionComponent, HTMLAttributes, forwardRef, useMemo } from "react";

// Components
import Button from "@/components/button";
import Dropdown from "@/components/dropdown";
import { Bars3BottomRightIcon } from "@heroicons/react/16/solid";

// Hooks
import useSearch from "@/hooks/search";

// Constants
import { POST_SORT_OPTIONS } from "@/constants";

type SortValues = {
  order: Nullable<string>;
  sortBy: Nullable<string>;
};

type SortMenuProps = Omit<HTMLAttributes<HTMLUListElement>, "onClick"> & {
  toggle: () => void;
  onClick?: (values: SortValues) => void;
};

const SortMenu = forwardRef<HTMLUListElement, SortMenuProps>(
  ({ className, toggle, onClick, ...props }, ref) => {
    const computedClassName = useMemo<string>(() => {
      return classNames([className, `bg-white rounded-md`]);
    }, [className]);

    const handleSortItemClick = (values: SortValues) => {
      toggle();

      !!onClick && onClick(values);
    };

    return (
      <ul ref={ref} {...props} className={computedClassName}>
        {POST_SORT_OPTIONS.map(({ title, values }, index) => (
          <li key={`post_sort_${index}`}>
            <a
              onClick={() => handleSortItemClick(values)}
              className={`block p-4 text-nowrap hover:cursor-pointer`}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    );
  }
);

SortMenu.displayName = "SortMenu";

type SearchParams = {
  order: Nullable<string>;
  sortBy: Nullable<string>;
};

type SortPostsProps = {
  className?: string;
  onSortChange?: (sortBy: Nullable<string>, order: Nullable<string>) => void;
};

const SortPosts: FunctionComponent<SortPostsProps> = ({
  className,
  onSortChange,
}) => {
  const { order, sortBy } = useSearch<SearchParams>({
    order: null,
    sortBy: null,
  });

  const selectSortTitle = useMemo<string>(() => {
    if (!sortBy && !order) {
      return "Sắp xếp";
    }

    const selectSortOption = POST_SORT_OPTIONS.find(
      ({ values }) => values.sortBy === sortBy && values.order === order
    );

    if (!selectSortOption) return "Sắp xếp";

    return selectSortOption.title;
  }, [order, sortBy]);

  const handleSortMenuClick = (values: SortValues) => {
    !!onSortChange && onSortChange(values.sortBy, values.order);
  };

  return (
    <Dropdown
      className={className}
      toggle={({ toggle }) => (
        <Button
          onClick={toggle}
          className={`
            flex flex-row items-center gap-x-2 text-nowrap
            bg-gray-300 !text-gray-600 hover:bg-gray-400
          `}
        >
          {selectSortTitle} <Bars3BottomRightIcon className={`w-5`} />
        </Button>
      )}
      menu={({ toggle }) => (
        <SortMenu toggle={toggle} onClick={handleSortMenuClick} />
      )}
    ></Dropdown>
  );
};

export default SortPosts;
