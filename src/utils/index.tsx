export const isServer = () => typeof window === "undefined";

export const getPage = (skip: number, limit = 10) => {
  return Math.floor(skip / limit) + 1;
};

export const getSkip = (page: number, limit = 10) => {
  return Math.max(0, page - 1) * limit;
};
