import useSearch from "@/hooks/search";
import { render } from "@testing-library/react";
import SearchBar from "./search-bar";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    push: () => null,
  }),
  usePathname: () => "",
  useSearchParams: () => new URLSearchParams({}),
}));

const searchPushFn = jest.fn();

jest.mock("@/hooks/search");

describe("Test Component <SearchBar />", () => {
  test("Render Component <SearchBar /> with default", () => {
    jest.mocked(useSearch).mockImplementation(() => ({
      search: "",
      push: searchPushFn,
    }));

    const { queryByTestId } = render(<SearchBar />);

    expect(queryByTestId("search-bar-input")).not.toBeNull();
    expect(queryByTestId("search-bar-button")).not.toBeNull();
  });

  test("Render Component <SearchBar /> with null search", () => {
    jest.mocked(useSearch).mockImplementation(() => ({
      search: null,
      push: searchPushFn,
    }));

    const { queryByTestId } = render(<SearchBar />);

    expect(queryByTestId("search-bar-input")).not.toBeNull();
    expect(
      queryByTestId("search-bar-input")?.getAttribute("value") === ""
    ).toBeTruthy();
  });

  test("Render Component <SearchBar /> with search value", () => {
    jest.mocked(useSearch).mockImplementation(() => ({
      push: searchPushFn,
      search: "Hello world",
    }));

    const { queryByTestId } = render(<SearchBar />);

    expect(
      queryByTestId("search-bar-input")?.getAttribute("value") === "Hello world"
    ).toBeTruthy();
  });

  test("Render Component <SearchBar /> with submit search keyword", async () => {
    const user = userEvent.setup();

    jest.mocked(useSearch).mockImplementation(() => ({
      search: "",
      push: searchPushFn,
    }));

    const { getByTestId } = render(<SearchBar />);

    await user.type(getByTestId("search-bar-input"), "Hello world");
    await user.click(getByTestId("search-bar-button"));

    expect(searchPushFn).toHaveBeenCalledWith({
      search: "Hello world",
    });
  });
});
