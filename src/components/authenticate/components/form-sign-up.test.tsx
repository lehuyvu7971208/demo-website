import useSearch from "@/hooks/search";
import { useAuthStore } from "@/store/auth-store-provider";
import { render, waitFor } from "@testing-library/react";
import FormSignUp from "./form-sign-up";
import userEvent from "@testing-library/user-event";

const searchParamsNoRedirect = {
  push: () => null,
};

const searchParamWithRedirect = {
  push: () => null,
  redirectUrl: "/posts",
};

jest.mock("@/hooks/search");

jest.mock("@/store/auth-store-provider");

const signUpFn = jest.fn(() => "accessToken");

const useAuthStoreDefault = () => ({
  signUp: signUpFn,
});

const useAuthStoreErrorLogin = () => ({
  signUp: () => {
    throw new Error("Something went wrong");
  },
});

describe("Test Component <FormSignUp />", () => {
  test("Render Component <FormSignUp /> with default", () => {
    const handleSuccessFn = jest.fn();

    jest.mocked(useAuthStore).mockImplementation(useAuthStoreDefault);

    jest.mocked(useSearch).mockImplementation(() => searchParamsNoRedirect);

    const { queryByTestId } = render(
      <FormSignUp onSuccess={handleSuccessFn} />
    );

    expect(queryByTestId("form-signup-button")).not.toBeNull();
    expect(queryByTestId("form-signup-username")).not.toBeNull();
    expect(queryByTestId("form-signup-password")).not.toBeNull();
    expect(queryByTestId("form-signup-last-name")).not.toBeNull();
    expect(queryByTestId("form-signup-first-name")).not.toBeNull();

    expect(queryByTestId("signin-link")).not.toBeNull();
    expect(
      queryByTestId("signin-link")?.getAttribute("href") === "/auth/sign-in"
    ).toBeTruthy();
  });

  test("Render Component <FormSignUp /> with redirect Url", () => {
    const handleSuccessFn = jest.fn();

    jest.mocked(useAuthStore).mockImplementation(useAuthStoreDefault);

    jest.mocked(useSearch).mockImplementation(() => searchParamWithRedirect);

    const { queryByTestId } = render(
      <FormSignUp onSuccess={handleSuccessFn} />
    );

    expect(queryByTestId("signin-link")).not.toBeNull();
    expect(
      queryByTestId("signin-link")?.getAttribute("href") ===
        "/auth/sign-in?redirectUrl=/posts"
    ).toBeTruthy();
  });

  test("Render Component <FormSignUp /> with empty input submit", async () => {
    const user = userEvent.setup();

    const handleSuccessFn = jest.fn();

    jest.mocked(useAuthStore).mockImplementation(useAuthStoreDefault);

    jest.mocked(useSearch).mockImplementation(() => searchParamsNoRedirect);

    const { getByTestId, queryByTestId } = render(
      <FormSignUp onSuccess={handleSuccessFn} />
    );

    await user.click(getByTestId("form-signup-button"));

    await waitFor(() => {
      expect(queryByTestId("input-username-error")).not.toBeNull();
      expect(queryByTestId("input-username-error")).toHaveTextContent(
        "Vui lòng nhập tên tài khoản"
      );
      expect(queryByTestId("input-password-error")).not.toBeNull();
      expect(queryByTestId("input-password-error")).toHaveTextContent(
        "Vui lòng nhập mật khẩu"
      );
    });
  });

  test("Render Component <FormSignUp /> with filled input submit", async () => {
    const user = userEvent.setup();

    const handleSuccessFn = jest.fn();

    jest.mocked(useAuthStore).mockImplementation(useAuthStoreDefault);

    jest.mocked(useSearch).mockImplementation(() => searchParamsNoRedirect);

    const { getByTestId, queryByTestId } = render(
      <FormSignUp onSuccess={handleSuccessFn} />
    );

    await user.type(getByTestId("form-signup-username"), "emilys");
    await user.type(getByTestId("form-signup-password"), "emilyspass");

    await user.type(getByTestId("form-signup-last-name"), "Deep");
    await user.type(getByTestId("form-signup-first-name"), "Johnny");

    await user.click(getByTestId("form-signup-button"));

    await waitFor(() => {
      expect(queryByTestId("input-username-error")).toBeNull();
      expect(queryByTestId("input-password-error")).toBeNull();
    });

    expect(signUpFn).toHaveBeenCalledWith({
      username: "emilys",
      password: "emilyspass",

      lastName: "Deep",
      firstName: "Johnny",
    });

    expect(handleSuccessFn).toHaveBeenCalledWith("accessToken");
  });

  test("Render Component <FormSignUp /> with sign up fail", async () => {
    const user = userEvent.setup();

    const handleSuccessFn = jest.fn();

    jest.mocked(useAuthStore).mockImplementation(useAuthStoreErrorLogin);

    jest.mocked(useSearch).mockImplementation(() => searchParamsNoRedirect);

    const { getByTestId, queryByTestId } = render(
      <FormSignUp onSuccess={handleSuccessFn} />
    );

    await user.type(getByTestId("form-signup-username"), "emilys");
    await user.type(getByTestId("form-signup-password"), "emilyspass");

    await user.type(getByTestId("form-signup-last-name"), "Deep");
    await user.type(getByTestId("form-signup-first-name"), "Johnny");

    await user.click(getByTestId("form-signup-button"));

    await waitFor(() => {
      expect(queryByTestId("form-signup-error")).not.toBeNull();
      expect(queryByTestId("form-signup-error")).toHaveTextContent(
        /đã có lỗi xảy ra/i
      );

      expect(handleSuccessFn).not.toHaveBeenCalled();
    });
  });
});
