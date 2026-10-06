export interface LoginUser {
  email: string;
  password: string;
}

export type RegisterUser = {
  username: string;
  email: string;
  phoneNumber: string;
  dob: string;
  password: string;
  confirmPassword: string;
};

export interface UpdateProfile {
  username: string;
  email: string;
  phoneNumber: string;
  dob: string;
  profileImage?: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface CurrentUser {
  userId: number;
  username: string;
  email: string;
  phoneNumber: string;
  dob: string;
  profileImage: string | null;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export type AuthResponse = ApiResponse<{
  userId: number;
  username: string;
  email: string;
}>;
