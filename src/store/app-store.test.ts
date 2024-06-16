import axios, { AxiosError } from "axios";
import Cookie from "js-cookie";
import { isServer } from "@/utils";
import { createAppStore } from "./app-store";
import MockAdapter from "axios-mock-adapter";
import { waitFor } from "@testing-library/react";

const sampleMeResponse = {
  id: 1,
  age: 20,
  image: "...",
  maidenName: "",
  gender: "female",
  username: "emilys",
  firstName: "Emily",
  lastName: "Johnson",
  phone: "+84999999999",
  birthDate: "09-09-1999",
  email: "emily.johnson@x.dummyjson.com",
};

const cookieSetFn = jest.fn();
const cookieRemoveFn = jest.fn();

jest.mock("@/utils");
jest.mock("js-cookie");

jest.mocked(Cookie.set).mockImplementation(cookieSetFn);
jest.mocked(Cookie.remove).mockImplementation(cookieRemoveFn);

jest.mock("@/utils/http/client", () => ({
  __esModule: true,
  default: axios,
}));

const mockAdapter = new MockAdapter(axios);

beforeEach(() => {
  jest.mocked(isServer).mockImplementation(() => false);

  mockAdapter.onGet("/auth/me").reply(200, sampleMeResponse);
});

describe("Test appStore", () => {
  test("Test appStore with default", () => {
    const appStore = createAppStore({
      accessToken: "foo",
      me: sampleMeResponse,
    });

    expect(appStore.getState().accessToken).toEqual("foo");
    expect(appStore.getState().me).toEqual(sampleMeResponse);

    appStore.getState().setAccessToken("bar");
    expect(appStore.getState().accessToken).toEqual("bar");
  });

  test("Test appStore getMe", async () => {
    const appStore = createAppStore({
      accessToken: "foo",
    });

    await appStore.getState().getMe();

    expect(appStore.getState().me).toMatchObject(sampleMeResponse);
  });

  test("Test appStore getMe fail", async () => {
    mockAdapter.onGet("/auth/me").reply(500, "Something went wrong");

    const appStore = createAppStore({
      accessToken: "foo",
    });

    await appStore.getState().getMe();

    expect(appStore.getState().me).toEqual(null);
    expect(appStore.getState().accessToken).toEqual(null);

    expect(cookieRemoveFn).toHaveBeenCalledWith("accessToken");
  });

  test("Test appStore get onServerSide", async () => {
    jest.mocked(isServer).mockImplementation(() => true);

    const appStore = createAppStore();

    appStore.getState().setAccessToken("foo");
    await waitFor(() => expect(appStore.getState().me).toEqual(null));
  });

  test("Test appStore setAccessToken", async () => {
    const appStore = createAppStore();

    appStore.getState().setAccessToken("foo");

    expect(cookieSetFn).toHaveBeenCalledWith("accessToken", "foo", {
      expires: 1,
    });

    await waitFor(() =>
      expect(appStore.getState().me).toMatchObject(sampleMeResponse)
    );
  });
});
