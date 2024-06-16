import Profile from "./profile";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAppStore } from "@/store/app-store-provider";

const authMe = {
  id: 1,
  gender: "female",
  username: "emilys",
  firstName: "Emily",
  lastName: "Johnson",
  email: "emily.johnson@x.dummyjson.com",
};

const routerPushFn = jest.fn();

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    push: routerPushFn,
  }),
  usePathname: () => "",
  useSearchParams: () => new URLSearchParams({}),
}));

jest.mock("@/store/app-store-provider");

const appStoreCloseFn = jest.fn();

const appStoreStateUnauthenticated = {
  me: null,
  accessToken: null,
  getMe: async () => {},
  close: appStoreCloseFn,
  setAccessToken: () => null,
};

const appStoreStateAuthenticated = {
  me: authMe,
  accessToken: "foo",
  getMe: async () => {},
  close: appStoreCloseFn,
  setAccessToken: () => null,
};

describe("Test Component <Profile />", () => {
  test("Render Component <Profile /> with unauthenticated", async () => {
    const user = userEvent.setup();

    jest
      .mocked(useAppStore)
      .mockImplementation((fn) => fn(appStoreStateUnauthenticated));

    const { getByTestId, queryByTestId } = render(<Profile />);

    expect(queryByTestId("profile-button-login")).not.toBeNull();

    await user.click(getByTestId("profile-button-login"));

    expect(routerPushFn).toHaveBeenCalled();
  });

  test("Render Component <Profile /> with authenticated", async () => {
    const user = userEvent.setup();

    jest
      .mocked(useAppStore)
      // @ts-ignore
      .mockImplementation((fn) => fn(appStoreStateAuthenticated));

    const { getByTestId, queryByTestId } = render(<Profile />);

    expect(queryByTestId("profile-summary")).not.toBeNull();
    expect(queryByTestId("profile-summary-fullname")).toHaveTextContent(
      `${authMe.firstName} ${authMe.lastName}`
    );

    await user.click(getByTestId("profile-summary"));

    expect(queryByTestId("profile-menu")).not.toBeNull();
    expect(queryByTestId("profile-menu-signout")).not.toBeNull();

    await user.click(getByTestId("profile-menu-signout"));
    expect(appStoreCloseFn).toHaveBeenCalled();
  });
});
