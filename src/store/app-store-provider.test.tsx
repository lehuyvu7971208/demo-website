import { ReactNode } from "react";
import { createStore } from "zustand";
import { createAppStore } from "@/store/app-store";
import { render, renderHook } from "@testing-library/react";
import { AppStoreProvider, useAppStore } from "./app-store-provider";

jest.mock("@/store/app-store");

const getMeFn = jest.fn();

const createAppStoreFn = jest.fn((initState) =>
  createStore()(() => ({
    ...initState,
    getMe: getMeFn,
  }))
);

// @ts-ignore
jest.mocked(createAppStore).mockImplementation(createAppStoreFn);

const WrapperWithToken = ({ children }: { children: ReactNode }) => (
  <AppStoreProvider accessToken={"foo"}>{children}</AppStoreProvider>
);

const WrapperWithNoToken = ({ children }: { children: ReactNode }) => (
  <AppStoreProvider>{children}</AppStoreProvider>
);

describe("Test Component <AppStoreProvider />", () => {
  test("Render Component <AppStoreProvider /> with no accessToken", () => {
    const { queryByTestId } = render(
      <AppStoreProvider>
        <div data-testid="child" />
      </AppStoreProvider>
    );

    expect(queryByTestId("child")).toBeInTheDocument();
    expect(createAppStoreFn).toHaveBeenCalledWith({ accessToken: undefined });
  });

  test("Render Component <AppStoreProvider /> with accessToken", () => {
    const { queryByTestId } = render(
      <AppStoreProvider accessToken={"foo"}>
        <div data-testid="child" />
      </AppStoreProvider>
    );

    expect(queryByTestId("child")).toBeInTheDocument();

    expect(getMeFn).toHaveBeenCalled();
    expect(createAppStoreFn).toHaveBeenCalledWith({ accessToken: "foo" });
  });

  test("Test hooks useAppStore with accessToken", () => {
    const { result } = renderHook(() => useAppStore((state) => state), {
      wrapper: WrapperWithToken,
    });

    expect(result.current.accessToken).toEqual("foo");
  });

  test("Test hooks useAppStore with accessToken", () => {
    const { result } = renderHook(() => useAppStore((state) => state), {
      wrapper: WrapperWithNoToken,
    });

    expect(result.current.accessToken).toEqual(undefined);
  });

  test("Test hooks useAppStore within provider", () => {
    expect(() =>
      renderHook(() => useAppStore((state) => state), {
        wrapper: AppStoreProvider,
      })
    ).not.toThrow(
      Error("appStoreContext must be used within AppStoreProvider")
    );
  });

  test("Test hooks useAppStore without provider", () => {
    expect(() => renderHook(() => useAppStore((state) => state))).toThrow(
      Error("appStoreContext must be used within AppStoreProvider")
    );
  });
});
