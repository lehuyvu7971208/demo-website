import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { createAuthStore } from "./auth-store";

const sampleAddUserResponse = {
  id: 1,
  age: 28,
  image: "...",
  weight: 63.16,
  height: 193.24,
  gender: "female",
  bloodGroup: "O-",
  eyeColor: "Green",
  firstName: "Emily",
  username: "emilys",
  lastName: "Johnson",
  maidenName: "Smith",
  password: "emilyspass",
  birthDate: "1996-5-30",
  phone: "+81 965-431-3024",
  email: "emily.johnson@x.dummyjson.com",
};

const mockAdapter = new MockAdapter(axios);

jest.mock("@/utils/http/client", () => ({
  __esModule: true,
  default: axios,
}));

beforeEach(() => {
  mockAdapter.onPost("/auth/login").reply(200, {
    token: "foo",
  });

  mockAdapter.onPost("/users/add").reply(200, sampleAddUserResponse);
});

describe("Test authStore", () => {
  test("Test authStore with default", async () => {
    const authStore = createAuthStore();

    const loginToken = await authStore.getState().login({
      username: "emilys",
      password: "emilyspass",
    });

    expect(loginToken).toEqual("foo");

    const signUpToken = await authStore.getState().signUp({
      username: "emilys",
      password: "emilyspass",
      lastName: "Deep",
      firstName: "Johnny",
    });

    expect(signUpToken).toEqual("foo");
  });
});
