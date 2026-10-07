import type { ApiResponse, ChangePassword, CurrentUser } from "../types/auth";
import { apiClient } from "./client";

export const userApi = {
  getMe: () => apiClient<ApiResponse<CurrentUser>>("/users/me"),

  updateProfile: (data: FormData) =>
    apiClient<ApiResponse<CurrentUser>>("/users/update-user", {
      method: "POST",
      body: data,
    }),

  changePassword: (data: ChangePassword) =>
    apiClient<ApiResponse<{ message: string }>>("/users/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  deleteAccount: () =>
    apiClient<ApiResponse<never>>("/users/delete-user", { method: "POST" }),
};
