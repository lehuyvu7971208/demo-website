import Authenticate from ".";
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
const routerReplaceFn = jest.fn();

const appStoreStateUnauthenticated = {
  me: null,
  accessToken: null,
  close: () => null,
  getMe: async () => {},
  setAccessToken: () => null,
};

const appStoreStateAuthenticated = {
  me: authMe,
  accessToken: "foo",
  close: () => null,
  getMe: async () => {},
  setAccessToken: () => null,
};

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    push: routerPushFn,
    replace: routerReplaceFn,
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams({ search: "hello" }),
}));

jest.mock("@/store/app-store-provider");

describe("Test Component <Authenticate />", () => {
  test("Render Component <Authenticate /> with authenticated", () => {
    jest
      .mocked(useAppStore)
      // @ts-ignore
      .mockImplementation((fn) => fn(appStoreStateAuthenticated));

    const { queryByTestId, getByTestId } = render(
      <Authenticate
        unauthenticateRender={({ login }) => (
          <button data-testid="authenticate-button" onClick={login}>
            Login
          </button>
        )}
      >
        <div data-testid={"authenticated"}>authenticated</div>
      </Authenticate>
    );

    expect(queryByTestId("authenticated")).not.toBeNull();
    expect(queryByTestId("authenticate-button")).toBeNull();
  });

  test("Render Component <Authenticate /> with no persistence", async () => {
    const user = userEvent.setup();

    jest
      .mocked(useAppStore)
      .mockImplementation((fn) => fn(appStoreStateUnauthenticated));

    const { queryByTestId, getByTestId } = render(
      <Authenticate
        unauthenticateRender={({ login }) => (
          <button data-testid="authenticate-button" onClick={login}>
            Login
          </button>
        )}
      >
        <div data-testid={"authenticated"}>authenticated</div>
      </Authenticate>
    );

    expect(queryByTestId("authenticated")).toBeNull();
    expect(queryByTestId("authenticate-button")).not.toBeNull();

    await user.click(getByTestId("authenticate-button"));
    expect(routerPushFn).toHaveBeenCalledWith(
      `/auth/sign-in?redirectUrl=${encodeURIComponent("/?search=hello")}`,
      {
        scroll: false,
      }
    );
  });

  test("Render Component <Authenticate /> with persistence", async () => {
    const user = userEvent.setup();

    jest
      .mocked(useAppStore)
      .mockImplementation((fn) => fn(appStoreStateUnauthenticated));

    const { queryByTestId } = render(
      <Authenticate
        persistence
        unauthenticateRender={({ login }) => (
          <button data-testid="authenticate-button" onClick={login}>
            Login
          </button>
        )}
      >
        <div data-testid={"authenticated"}>authenticated</div>
      </Authenticate>
    );

    expect(queryByTestId("authenticated")).toBeNull();
    expect(queryByTestId("authenticate-button")).not.toBeNull();

    expect(routerReplaceFn).toHaveBeenCalledWith(
      `/auth/sign-in?redirectUrl=${encodeURIComponent("/?search=hello")}`,
      {
        scroll: false,
      }
    );
  });

  test("Render Component <Authenticate /> with no unauthenticateRender", async () => {
    const user = userEvent.setup();

    jest
      .mocked(useAppStore)
      .mockImplementation((fn) => fn(appStoreStateUnauthenticated));

    const { container } = render(<Authenticate />);

    expect(container).toBeEmptyDOMElement();
  });
});
