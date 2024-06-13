import { AxiosInstance } from "axios";

export type GetSingleUserResponse = {
  id: number;
  age: number;
  email: string;
  phone: string;
  image: string;
  gender: string;
  lastName: string;
  username: string;
  firstName: string;
  birthDate: string;
  maidenName: string;
};

export type AddUserPayload = {
  username: string;
  password: string;
  lastName?: string;
  firstName?: string;
};

export type AddUserResponse = {
  id: number;
  username: string;
  lastName: string;
  firstName: string;
};

const userApi = (http: AxiosInstance) => ({
  getSingleUser(id: number) {
    return http.get<GetSingleUserResponse>(`/users/${id}`);
  },

  addUser(payload: AddUserPayload) {
    return http.post<AddUserResponse>("/users/add", payload);
  },
});

export default userApi;
