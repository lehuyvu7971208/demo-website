import { useState } from "react";
import { POST_SORT_OPTIONS } from "@/constants";
import SortPosts, { SortMenu } from "./sort-posts";
import { fireEvent, render, waitFor } from "@testing-library/react";

describe("Test component <SortPosts />", () => {
  const options = [...POST_SORT_OPTIONS];
  options.shift();

  test("Render <SortPosts /> Default", () => {
    const { queryByTestId } = render(<SortPosts />);
    const toggleElement = queryByTestId("sort-toggle");

    expect(toggleElement).not.toBeNull();
    expect(toggleElement).toHaveTextContent(/sắp xếp/i);

    const menuElement = queryByTestId("sort-menu");
    expect(menuElement).toBeNull();

    if (toggleElement) {
      fireEvent.click(toggleElement);
      waitFor(() => expect(menuElement).not.toBeNull());

      fireEvent.click(toggleElement);
      waitFor(() => expect(menuElement).toBeNull());
    }
  });

  options.forEach(({ title, values }) => {
    test(`Render component <SortPost> with value ${title}`, () => {
      const { queryByTestId } = render(<SortPosts value={values} />);

      const toggleElement = queryByTestId("sort-toggle");
      expect(toggleElement).toHaveTextContent(title);
    });
  });

  test(`Render component <SortPost> with unexpected value`, () => {
    const { queryByTestId } = render(
      <SortPosts value={{ order: "foo", sortBy: "bar" }} />
    );
    const toggleElement = queryByTestId("sort-toggle");
    expect(toggleElement).toHaveTextContent(/sắp xếp/i);
  });

  test(`Render component <SortPost> with null value`, () => {
    const { queryByTestId } = render(
      <SortPosts value={{ order: null, sortBy: null }} />
    );
    const toggleElement = queryByTestId("sort-toggle");
    expect(toggleElement).toHaveTextContent(/sắp xếp/i);
  });

  test("Render <SortPosts /> Item Click", () => {
    const { queryByTestId, queryAllByTestId } = render(<SortPosts />);

    const toggleElement = queryByTestId("sort-toggle");

    if (toggleElement) {
      options.forEach(async ({ title }, index) => {
        fireEvent.click(toggleElement);

        expect(queryByTestId("sort-menu")).not.toBeNull();

        const sortLinks = queryAllByTestId("sort-link");
        fireEvent.click(sortLinks[index]);

        expect(queryByTestId("sort-menu")).toBeNull();
      });
    }
  });

  test("Render <SortPosts /> with OnSortChange", () => {
    const handleOnSortChange = jest.fn();
    const { queryByTestId, queryAllByTestId } = render(
      <SortPosts onSortChange={handleOnSortChange} />
    );

    const toggleElement = queryByTestId("sort-toggle");

    if (toggleElement) {
      POST_SORT_OPTIONS.forEach(async ({ values }, index) => {
        fireEvent.click(toggleElement);

        const sortLinks = queryAllByTestId("sort-link");
        fireEvent.click(sortLinks[index]);

        expect(handleOnSortChange).toHaveBeenCalledWith(
          values.sortBy,
          values.order
        );
      });
    }
  });

  test("Render <SortMenu /> default", () => {
    const { queryAllByTestId } = render(<SortMenu toggle={() => null} />);

    const sortLinks = queryAllByTestId("sort-link");

    POST_SORT_OPTIONS.forEach(({ title }, index) => {
      expect(sortLinks[index]).not.toBeNull();
      expect(sortLinks[index]).toHaveTextContent(title);
    });
  });
});
