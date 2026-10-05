import type {
  ApiResponse,
  AuthResponse,
  LoginUser,
  RegisterUser,
} from "../types/auth";
import { apiClient } from "./client";

export const authApi = {
  register: (data: RegisterUser) =>
    apiClient<ApiResponse<{ username: string; email: string }>>(
      "/users/register",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    ),

  login: (credentials: LoginUser) =>
    apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  logout: () =>
    apiClient<ApiResponse<never>>("/auth/logout", { method: "POST" }),
};
