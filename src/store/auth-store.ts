// Utilities
import httpClient from "@/utils/http/client";
import { createStore } from "zustand/vanilla";

// Apis
import authApi, { LoginPayload } from "@/api/auth";
import userApi, { AddUserPayload } from "@/api/user";

export type AuthState = {};

export type AuthActions = {
  login(payload: LoginPayload): Promise<string>;
  signUp(payload: AddUserPayload): Promise<string>;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,

    async login(payload) {
      const response = await authApi(httpClient).login(payload);

      return response.data.token;
    },

    async signUp(payload) {
      await userApi(httpClient).addUser(payload);

      /**
       * @description DummyJSON doesn't support a Sign-up API.
       * SOLUTION: Creating a new getting token flow after signing up by calling login API.
       */

      const token = await this.login({
        username: "emilys",
        password: "emilyspass",
      });

      return token;
    },
  }));
};
