import FormTextarea from "./textarea";
import { render } from "@testing-library/react";

describe("Test Component <FormTextarea />", () => {
  test("Render Component <FormTextarea /> with default", () => {
    const { queryByTestId } = render(
      <FormTextarea
        name="username"
        label="Họ và tên"
        data-testid="textarea-username"
      />
    );

    expect(queryByTestId("textarea-username")).toBeInTheDocument();

    expect(queryByTestId("textarea-username-label")).toBeInTheDocument();
    expect(queryByTestId("textarea-username-label")).toHaveTextContent(
      /họ và tên/i
    );
  });

  test("Render Component <FormTextarea /> no label", () => {
    const { queryByTestId } = render(
      <FormTextarea name="username" data-testid="textarea-username" />
    );

    expect(queryByTestId("textarea-username-label")).not.toBeInTheDocument();
  });

  test("Render Component <FormTextarea /> with error", () => {
    const { queryByTestId } = render(
      <FormTextarea
        name="username"
        error="Đã có lỗi xảy ra"
        data-testid="textarea-username"
      />
    );

    expect(queryByTestId("textarea-username-error")).toBeInTheDocument();
    expect(queryByTestId("textarea-username-error")).toHaveTextContent(
      /đã có lỗi xảy ra/i
    );
  });
});
