import axios from "axios";

export const createAxiosIntance = () => {
  return axios.create({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
};
