import Cookies from "js-cookie";
import { createAxiosIntance } from "@/utils/http";

const httpClient = createAxiosIntance();

httpClient.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken");

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});

export default httpClient;
