import { AxiosInstance, AxiosResponse } from "axios";

export type MeResponse = {
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

export type LoginPayload = {
  username: string;
  password: string;
  expiresInMins?: number;
};

export type LoginResponse = {
  id: number;
  email: string;
  image: string;
  token: string;
  gender: string;
  username: string;
  lastName: string;
  firstName: string;
  refreshToken: string;
};

const authApi = (http: AxiosInstance) => ({
  async me() {
    return await http.get<MeResponse>("/auth/me");
  },

  async login(payload: LoginPayload) {
    return http.post<LoginResponse>("/auth/login", {
      expiresInMins: parseInt(process.env.NEXT_PUBLIC_USER_LIFETIME ?? "60"),
      ...payload,
    });
  },
});

export default authApi;
