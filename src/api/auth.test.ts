import authApi from "./auth";
import axios, { AxiosError } from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAdapter = new MockAdapter(axios);

const sampleMeResponse = {
  id: 1,
  gender: "female",
  username: "emilys",
  firstName: "Emily",
  lastName: "Johnson",
  email: "emily.johnson@x.dummyjson.com",
};

const sampleLoginResponse = {
  id: 1,
  token: "foo",
  gender: "female",
  username: "emilys",
  firstName: "Emily",
  lastName: "Johnson",
  refreshToken: "bar",
};

describe("Test authApi", () => {
  test("Test authApi.me", async () => {
    mockAdapter.onGet("/auth/me").reply(200, sampleMeResponse);

    const response = await authApi(axios).me();
    expect(response.data).toMatchObject(sampleMeResponse);
  });

  test("Test authApi.me fail", async () => {
    mockAdapter.onGet("/auth/me").reply(500, "Something went wrong");

    expect(authApi(axios).me()).rejects.toBeInstanceOf(AxiosError);
  });

  test("Test authApi.login", async () => {
    mockAdapter.onPost("/auth/login").reply(200, sampleLoginResponse);

    const response = await authApi(axios).login({
      username: "emilys",
      password: "emilyspass",
    });

    expect(response.data).toMatchObject(sampleLoginResponse);
  });

  test("Test authApi.login fail", async () => {
    mockAdapter.onPost("/auth/login").reply(500, "Something went wrong");

    expect(
      authApi(axios).login({
        username: "emilys",
        password: "emilyspass",
      })
    ).rejects.toBeInstanceOf(AxiosError);
  });
});
