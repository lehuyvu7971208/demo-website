import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useGetSingleUser from "./get-single-user";
import QueryProvider from "@/components/query-provider";
import { renderHook, waitFor } from "@testing-library/react";

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

const mockAdapter = new MockAdapter(axios);

jest.mock("@/utils/http/client", () => ({
  __esModule: true,
  default: axios,
}));

mockAdapter.onGet("/users/1").reply(200, sampleSingleUserResponse);

describe("Test hook useGetSingleUser", () => {
  test("Test hook useGetSingleUser with default", async () => {
    const { result } = renderHook(() => useGetSingleUser(1), {
      wrapper: QueryProvider,
    });

    await waitFor(() => {
      expect(result.current.data).toMatchObject(sampleSingleUserResponse);
    });
  });
});
