import Cookies from "js-cookie";
import httpClient from "./client";
import MockAdapter from "axios-mock-adapter";

jest.mock("js-cookie");

const mockAdapter = new MockAdapter(httpClient);

mockAdapter.onGet("/").reply(200, { message: "Hello world" });

describe("Test httpClient", () => {
  test("Test httpClient with accessToken", async () => {
    // @ts-ignore
    jest.mocked(Cookies.get).mockImplementation(() => "foo");

    const response = await httpClient.get("/");

    expect(response.data.message).toEqual("Hello world");
    expect(response.config.headers.Authorization).toEqual("Bearer foo");
  });

  test("Test httpClient with no accessToken", async () => {
    // @ts-ignore
    jest.mocked(Cookies.get).mockImplementation(() => null);

    const response = await httpClient.get("/");

    expect(response.data.message).toEqual("Hello world");
    expect(response.config.headers.Authorization).toEqual(undefined);
  });
});
