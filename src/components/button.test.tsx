import Button from "./button";
import { render } from "@testing-library/react";

describe("Test Component <Button>", () => {
  test("Render Component <Button> with default", () => {
    const { getByTestId } = render(<Button>Click me</Button>);

    expect(getByTestId("button")).toBeInTheDocument();
    expect(getByTestId("button")).toHaveTextContent(/click me/i);
  });

  test("Render Component <Button> with loading", () => {
    const { getByTestId } = render(
      <Button loading loadingClassName="button-loading">
        Click me
      </Button>
    );

    expect(getByTestId("button")).toBeInTheDocument();
    expect(getByTestId("button")).not.toHaveTextContent(/click me/i);
    expect(
      getByTestId("button").classList.contains("button-loading")
    ).toBeTruthy();
  });
});
