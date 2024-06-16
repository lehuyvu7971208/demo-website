import {
  useRouter,
  usePathname,
  useSearchParams,
  ReadonlyURLSearchParams,
} from "next/navigation";
import useSearch from "./search";
import { renderHook, waitFor } from "@testing-library/react";

const defaultValue = {
  search: null,
};

jest.mock("next/navigation");

describe("Test hook useSearch", () => {
  test("Test hook useSearch with default", () => {
    const routerPush = jest.fn();

    // @ts-ignore
    jest.mocked(useRouter).mockImplementation(() => ({
      push: routerPush,
    }));

    jest.mocked(usePathname).mockImplementation(() => "/");
    jest
      .mocked(useSearchParams)
      .mockImplementation(() => new ReadonlyURLSearchParams({}));

    const { result } = renderHook(() => useSearch(defaultValue));

    expect(result.current.search).toEqual(defaultValue.search);
  });

  test("Test hook useSearch with query ?search=hello", async () => {
    const routerPush = jest.fn();

    // @ts-ignore
    jest.mocked(useRouter).mockImplementation(() => ({
      push: routerPush,
    }));

    jest.mocked(usePathname).mockImplementation(() => "/");
    jest
      .mocked(useSearchParams)
      // @ts-ignore
      .mockImplementation(() => new URLSearchParams({ search: "hello" }));

    const { result } = renderHook(() => useSearch(defaultValue));

    await waitFor(() => expect(result.current.search).toEqual("hello"));

    result.current.push({ search: "love" });
    expect(routerPush).toHaveBeenCalledWith("/?search=love");

    result.current.push({ search: null });
    expect(routerPush).toHaveBeenCalledWith("/");
  });

  test("Test hook useSearch with query willSearchUpdate default", async () => {
    const routerPush = jest.fn();

    // @ts-ignore
    jest.mocked(useRouter).mockImplementation(() => ({
      push: routerPush,
    }));

    jest.mocked(usePathname).mockImplementation(() => "/auth/sign-in");
    jest
      .mocked(useSearchParams)
      // @ts-ignore
      .mockImplementation(() => new URLSearchParams({ search: "hello" }));

    const { result } = renderHook(() => useSearch(defaultValue));

    await waitFor(() => expect(result.current.search).toEqual(null));
  });
});
