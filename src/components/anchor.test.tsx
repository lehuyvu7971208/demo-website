import Anchor from "./anchor";
import { render } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  __esModule: true,
  usePathname: () => "/posts",
}));

describe("Text Component <Anchor />", () => {
  test("Render Component <Anchor /> with default", () => {
    const { getByTestId } = render(<Anchor href="/posts" />);

    expect(getByTestId("anchor")).toBeInTheDocument();
  });

  test("Render Component <Anchor /> with activeClassName", () => {
    const { getByTestId } = render(
      <Anchor href="/posts" activeClassName="actived-anchor" />
    );

    expect(getByTestId("anchor")).toBeInTheDocument();
    expect(
      getByTestId("anchor").classList.contains("actived-anchor")
    ).toBeTruthy();
  });
});
