import { cookies } from "next/headers";
import { createAxiosIntance } from ".";

const httpServer = createAxiosIntance();

httpServer.interceptors.request.use((config) => {
  const accessToken = cookies().get("accessToken")?.value;

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});

export default httpServer;
