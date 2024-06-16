import { createStore } from "zustand";
import { createAuthStore } from "./auth-store";
import { render, renderHook, waitFor } from "@testing-library/react";
import { AuthStoreProvider, useAuthStore } from "./auth-store-provider";

jest.mock("@/store/auth-store");

const createAuthStoreFn = jest.fn((initState) =>
  createStore()(() => ({
    ...initState,
  }))
);

// @ts-ignore
jest.mocked(createAuthStore).mockImplementation(createAuthStoreFn);

describe("Test Component <AuthStoreProvider />", () => {
  test("Render Component <AuthStoreProvider /> with default", () => {
    const { queryByTestId } = render(
      <AuthStoreProvider>
        <div data-testid="child"></div>
      </AuthStoreProvider>
    );

    expect(queryByTestId("child")).toBeInTheDocument();
  });

  test("Test hooks useAuthStore without provider", () => {
    expect(() => renderHook(() => useAuthStore((state) => state))).toThrow(
      Error("authStoreContext must be used within AuthStoreProvider")
    );
  });

  test("Test hooks useAuthStore within provider", async () => {
    expect(() =>
      renderHook(() => useAuthStore((state) => state), {
        wrapper: AuthStoreProvider,
      })
    ).not.toThrow(
      Error("authStoreContext must be used within AuthStoreProvider")
    );
  });
});
