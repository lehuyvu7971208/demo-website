import Header from ".";
import { render } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    push: () => null,
  }),
  usePathname: () => "",
  useSearchParams: () => new URLSearchParams({}),
}));

jest.mock("@/store/app-store-provider", () => ({
  __esModule: true,
  useAppStore: () => ({}),
}));

describe("Test Component <Header>", () => {
  test("Render Component <Header> with default", () => {
    const { queryByTestId } = render(<Header />);

    expect(queryByTestId("header-link-homepage")).not.toBeNull();
    expect(
      queryByTestId("header-link-homepage")?.getAttribute("href") === "/"
    ).toBeTruthy();
  });
});
