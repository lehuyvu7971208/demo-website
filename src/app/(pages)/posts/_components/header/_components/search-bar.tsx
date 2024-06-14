"use client";

// Utilities
import classNames from "classnames";
import { useMemo, useEffect, forwardRef, HTMLAttributes } from "react";

// Components
import Button from "@/components/button";
import { Formik, useFormik } from "formik";
import FormInput from "@/components/form/input";

// Hooks
import useSearch from "@/hooks/search";

// Icons
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

type FormValues = {
  search: Nullable<string>;
};

type SearchParams = {
  search: Nullable<string>;
};

type SearchBarProps = {} & HTMLAttributes<HTMLDivElement>;

const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(
  ({ className, ...props }, ref) => {
    const { search, push } = useSearch<SearchParams>({ search: "" });

    const computedClassName = useMemo<string>(() => {
      return classNames([className, "flex"]);
    }, [className]);

    const handleFormSubmit = async (values: FormValues) => {
      push({
        search: values.search,
      });

      return;
    };

    const { values, setValues, handleSubmit } = useFormik<FormValues>({
      onSubmit: handleFormSubmit,
      initialValues: { search },
    });

    useEffect(() => {
      setValues({ search });
    }, [search, setValues]);

    return (
      <div ref={ref} className={computedClassName}>
        <Formik<FormValues>
          onSubmit={handleFormSubmit}
          initialValues={{ search: search }}
        >
          <form
            onSubmit={handleSubmit}
            className={`flex w-full flex-row gap-x-3 max-sm:relative`}
          >
            <FormInput
              name="search"
              className="w-full"
              placeholder="Tìm kiếm bài viết theo tiêu đề, nội dung"
              value={values.search ?? ""}
              onChange={(event) => setValues({ search: event.target.value })}
            />

            <Button
              type="submit"
              title="Tìm bài viết"
              className={`
                flex-0 !w-[42px] !rounded-full 
                bg-gray-200 !text-gray-600 hover:!bg-gray-400
                max-sm:absolute max-sm:right-2 max-sm:!w-[30px] max-sm:h-[30px] 
                max-sm:p-0 max-sm:flex max-sm:items-center max-sm:justify-center
                max-sm:top-1/2 max-sm:origin-center max-sm:translate-y-[-50%]
              `}
            >
              <MagnifyingGlassIcon className="max-sm:w-5" />
            </Button>
          </form>
        </Formik>
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
