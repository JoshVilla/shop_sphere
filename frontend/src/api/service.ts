import { post } from "./apiConfig";

export const register = (params: {}) => {
  return post("/register", params);
};
export const login = (params: {}) => {
  return post("/login", params);
};

export const googleLogin = (params: {}) => {
  return post("/googleLogin", params);
};
