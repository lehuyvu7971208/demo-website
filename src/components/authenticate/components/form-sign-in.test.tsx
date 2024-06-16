import { AxiosError } from "axios";
import useSearch from "@/hooks/search";
import FormSignIn from "./form-sign-in";
import userEvent from "@testing-library/user-event";
import { render, waitFor } from "@testing-library/react";
import { useAuthStore } from "@/store/auth-store-provider";

const searchParamsNoRedirect = {
  push: () => null,
};

const searchParamWithRedirect = {
  push: () => null,
  redirectUrl: "/posts",
};

jest.mock("@/hooks/search");

const loginFn = jest.fn(() => "accessToken");

jest.mock("@/store/auth-store-provider");

const useAuthStoreDefault = () => ({
  login: loginFn,
});

const useAuthStoreErrorLogin = () => ({
  login: () => {
    throw new Error("Something went wrong");
  },
});

const useAuthStoreWrongAccountLogin = () => ({
  login: () => {
    const error = new AxiosError("Account wrong");
    // @ts-ignore
    error.response = {
      status: 400,
    };
    throw error;
  },
});

describe("Test Component <FormSignIn />", () => {
  test("Render Component <FormSignIn /> with default", () => {
    const handleSuccessFn = jest.fn();

    jest.mocked(useAuthStore).mockImplementation(useAuthStoreDefault);

    jest.mocked(useSearch).mockImplementation(() => searchParamsNoRedirect);

    const { queryByTestId } = render(
      <FormSignIn onSuccess={handleSuccessFn} />
    );

    expect(queryByTestId("form-signin-button")).not.toBeNull();
    expect(queryByTestId("form-signin-username")).not.toBeNull();
    expect(queryByTestId("form-signin-password")).not.toBeNull();

    expect(queryByTestId("signup-link")).not.toBeNull();
    expect(
      queryByTestId("signup-link")?.getAttribute("href") === "/auth/sign-up"
    ).toBeTruthy();
  });

  test("Render Component <FormSignIn /> with redirect url", () => {
    const handleSuccessFn = jest.fn();

    jest.mocked(useAuthStore).mockImplementation(useAuthStoreDefault);

    jest.mocked(useSearch).mockImplementation(() => searchParamWithRedirect);

    const { queryByTestId } = render(
      <FormSignIn onSuccess={handleSuccessFn} />
    );
    
    expect(queryByTestId("signup-link")).not.toBeNull();
    expect(
      queryByTestId("signup-link")?.getAttribute("href") ===
        "/auth/sign-up?redirectUrl=/posts"
    ).toBeTruthy();
  });

  test("Render Component <FormSignIn /> with empty input submit", async () => {
    const user = userEvent.setup();

    const handleSuccessFn = jest.fn();

    jest.mocked(useAuthStore).mockImplementation(useAuthStoreDefault);

    jest.mocked(useSearch).mockImplementation(() => searchParamsNoRedirect);

    const { queryByTestId, getByTestId } = render(
      <FormSignIn onSuccess={handleSuccessFn} />
    );

    await user.click(getByTestId("form-signin-button"));

    await waitFor(() => {
      expect(queryByTestId("input-username-error")).not.toBeNull();
      expect(queryByTestId("input-username-error")).toHaveTextContent(
        "Vui lòng nhập tài khoản"
      );
      expect(queryByTestId("input-password-error")).not.toBeNull();
      expect(queryByTestId("input-password-error")).toHaveTextContent(
        "Vui lòng nhập mật khẩu"
      );
    });
  });

  test("Render Component <FormSignIn /> with filled input submit", async () => {
    const user = userEvent.setup();

    const handleSuccessFn = jest.fn();

    jest.mocked(useAuthStore).mockImplementation(useAuthStoreDefault);

    jest.mocked(useSearch).mockImplementation(() => searchParamsNoRedirect);

    const { queryByTestId, getByTestId } = render(
      <FormSignIn onSuccess={handleSuccessFn} />
    );

    await user.type(getByTestId("form-signin-username"), "emilys");
    await user.type(getByTestId("form-signin-password"), "emilyspass");
    await user.click(getByTestId("form-signin-button"));

    await waitFor(() => {
      expect(queryByTestId("input-username-error")).toBeNull();
      expect(queryByTestId("input-password-error")).toBeNull();
    });

    expect(loginFn).toHaveBeenCalledWith({
      username: "emilys",
      password: "emilyspass",
    });

    expect(handleSuccessFn).toHaveBeenCalledWith("accessToken");
  });

  test("Render Component <FormSignIn /> with login fail", async () => {
    const user = userEvent.setup();

    const handleSuccessFn = jest.fn();

    jest.mocked(useAuthStore).mockImplementation(useAuthStoreErrorLogin);

    jest.mocked(useSearch).mockImplementation(() => searchParamsNoRedirect);

    const { queryByTestId, getByTestId } = render(
      <FormSignIn onSuccess={handleSuccessFn} />
    );

    await user.type(getByTestId("form-signin-username"), "emilys");
    await user.type(getByTestId("form-signin-password"), "emilyspass");
    await user.click(getByTestId("form-signin-button"));

    await waitFor(() => {
      expect(queryByTestId("form-signin-error")).not.toBeNull();
      expect(queryByTestId("form-signin-error")).toHaveTextContent(
        /đã có lỗi xảy ra/i
      );

      expect(handleSuccessFn).not.toHaveBeenCalled();
    });
  });

  test("Render Component <FormSignIn /> with wrong account", async () => {
    const user = userEvent.setup();

    const handleSuccessFn = jest.fn();

    jest.mocked(useAuthStore).mockImplementation(useAuthStoreWrongAccountLogin);

    jest.mocked(useSearch).mockImplementation(() => searchParamsNoRedirect);

    const { queryByTestId, getByTestId } = render(
      <FormSignIn onSuccess={handleSuccessFn} />
    );

    await user.type(getByTestId("form-signin-username"), "emilys");
    await user.type(getByTestId("form-signin-password"), "emilyspass");
    await user.click(getByTestId("form-signin-button"));

    await waitFor(() => {
      expect(queryByTestId("form-signin-error")).not.toBeNull();
      expect(queryByTestId("form-signin-error")).toHaveTextContent(
        /tài khoản hoặc mật khẩu không chính xác/i
      );

      expect(handleSuccessFn).not.toHaveBeenCalled();
    });
  });
});
