import userEvent from "@testing-library/user-event";
import FormPassword from "./password";
import { render, waitFor } from "@testing-library/react";

describe("Test Component <FormInput />", () => {
  test("Render Component <FormInput /> with default", () => {
    const { queryByTestId } = render(
      <FormPassword
        name="password"
        label="Mật khẩu"
        data-testid="input-password"
      />
    );

    expect(queryByTestId("input-password")).toBeInTheDocument();

    expect(queryByTestId("input-password-toggle")).toBeInTheDocument();

    expect(queryByTestId("input-password-label")).toBeInTheDocument();
    expect(queryByTestId("input-password-label")).toHaveTextContent(
      /mật khẩu/i
    );
  });

  test("Render Component <FormInput /> no label", () => {
    const { queryByTestId } = render(
      <FormPassword name="password" data-testid="input-password" />
    );

    expect(queryByTestId("input-password-label")).not.toBeInTheDocument();
  });

  test("Render Component <FormInput /> with error", () => {
    const { queryByTestId } = render(
      <FormPassword
        name="password"
        error="Đã có lỗi xảy ra"
        data-testid="input-password"
      />
    );

    expect(queryByTestId("input-password-error")).toBeInTheDocument();
    expect(queryByTestId("input-password-error")).toHaveTextContent(
      /đã có lỗi xảy ra/i
    );
  });

  test("Render Component <FormInput /> with toggle password", async () => {
    const user = userEvent.setup();

    const { getByTestId, queryByTestId } = render(
      <FormPassword name="password" data-testid="input-password" />
    );

    expect(queryByTestId("input-password-hide")).toBeInTheDocument();

    await user.click(getByTestId("input-password-toggle"));
    await waitFor(() =>
      expect(queryByTestId("input-password-show")).toBeInTheDocument()
    );

    await user.click(getByTestId("input-password-toggle"));
    await waitFor(() =>
      expect(queryByTestId("input-password-hide")).toBeInTheDocument()
    );
  });
});
