import Cookie from "js-cookie";
import { isServer } from "@/utils";
import httpClient from "@/utils/http/client";
import { createStore } from "zustand/vanilla";
import authApi, { MeResponse } from "@/api/auth";

export type AppState = {
  me: Nullable<MeResponse>;
  accessToken: Nullable<string> | undefined;
};

export type AppActions = {
  close(): void;
  getMe(): Promise<void>;
  setAccessToken(accessToken: string): void;
};

export type AppStore = AppState & AppActions;

export const defaultInitState: AppState = {
  me: null,
  accessToken: null,
};

export const createAppStore = (
  initState: Partial<AppState> = defaultInitState
) => {
  return createStore<AppStore>()((set) => ({
    ...defaultInitState,
    ...initState,

    close() {
      Cookie.remove("accessToken");

      set({ me: null, accessToken: null });
    },

    async getMe() {
      try {
        if (isServer()) return;

        const response = await authApi(httpClient).me();

        set({ me: response.data });
      } catch (error) {
        this.close();
      }
    },

    setAccessToken(accessToken) {
      Cookie.set("accessToken", accessToken, {
        expires: 1,
      });

      set(() => ({ accessToken }));

      this.getMe();
    },
  }));
};
