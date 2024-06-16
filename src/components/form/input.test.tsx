import FormInput from "./input";
import { render } from "@testing-library/react";

describe("Test Component <FormInput />", () => {
  test("Render Component <FormInput /> with default", () => {
    const { queryByTestId } = render(
      <FormInput
        name="username"
        label="Họ và tên"
        data-testid="input-username"
      />
    );

    expect(queryByTestId("input-username")).toBeInTheDocument();

    expect(queryByTestId("input-username-label")).toBeInTheDocument();
    expect(queryByTestId("input-username-label")).toHaveTextContent(
      /họ và tên/i
    );
  });

  test("Render Component <FormInput /> no label", () => {
    const { queryByTestId } = render(
      <FormInput name="username" data-testid="input-username" />
    );

    expect(queryByTestId("input-username-label")).not.toBeInTheDocument();
  });

  test("Render Component <FormInput /> with error", () => {
    const { queryByTestId } = render(
      <FormInput
        name="username"
        data-testid="input-username"
        error="Đã có lỗi xảy ra"
      />
    );

    expect(queryByTestId("input-username-error")).toBeInTheDocument();
    expect(queryByTestId("input-username-error")).toHaveTextContent(
      /đã có lỗi xảy ra/i
    );
  });
});
