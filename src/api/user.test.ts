import userApi from "./user";
import axios, { AxiosError } from "axios";
import MockAdapter from "axios-mock-adapter";

const sampleSingleUserResponse = {
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

beforeEach(() => {
  mockAdapter.onGet("/users/1").reply(200, sampleSingleUserResponse);
  mockAdapter.onPost("/users/add").reply(200, sampleAddUserResponse);
});

describe("Test userApi", () => {
  test("Test userApi.getSingleUser", async () => {
    const response = await userApi(axios).getSingleUser(1);
    expect(response.data).toMatchObject(sampleSingleUserResponse);
  });

  test("Test userApi.getSingleUser fail", async () => {
    mockAdapter.onGet("/users/1").reply(500, "Something went wrong");

    expect(userApi(axios).getSingleUser(1)).rejects.toBeInstanceOf(AxiosError);
  });

  test("Test userApi.addUser", async () => {
    const response = await userApi(axios).addUser({
      username: "emilys",
      password: "emilyspass",
    });
    expect(response.data).toMatchObject(sampleAddUserResponse);
  });

  test("Test userApi.addUser fail", async () => {
    mockAdapter.onPost("/users/add").reply(500, "Something went wrong");

    expect(
      userApi(axios).addUser({
        username: "emilys",
        password: "emilyspass",
      })
    ).rejects.toBeInstanceOf(AxiosError);
  });
});
