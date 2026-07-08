import type { AuthResponse, LoginUser, RegisterUser } from "../types/auth";
import { apiClient } from "./client";

export const authApi = {
  register: (data: RegisterUser) =>
    apiClient<AuthResponse>("/users/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (credentials: LoginUser) =>
    apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  logout: () => apiClient("/auth/logout", { method: "POST" }),

  refreshToken: () => apiClient("/auth/refresh", { method: "POST" }),
};
