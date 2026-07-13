import { api } from "@/lib/api";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const AuthService = {
  register(data: RegisterData) {
    return api.post("/auth/register/", data);
  },

  login(data: LoginData) {
    return api.post("/auth/login/", data);
  },

  me() {
    return api.get("/auth/me/");
  },

  logout() {
    return api.post("/auth/logout/");
  },
};