export type User = {
  username: string;
  email: string;
  phoneNumber: string;
  dob: string;
  profileImage?: string | undefined;
  password: string;
};

export type UpdateUser = {
  username?: string;
  dob?: string;
  profileImage?: string;
};

export type UserId = {
  userId: number;
};

export type ChangePassword = {
  currentPassword: string;
  newPassword: string;
};

export type UpdateUserInput = UpdateUser & UserId;

export type ChangePasswordInput = ChangePassword & UserId;

export function createUserModel(userData: User) {
  return {
    username: userData.username,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    dob: userData.dob,
    profileImage: userData.profileImage,
    password: userData.password,
  };
}

export function getUserByIdModel(userData: UserId) {
  return {
    userId: userData.userId,
  };
}

export function updateUserModel(
  userData: UpdateUser,
  userId: number,
): UpdateUserInput {
  return {
    userId,
    username: userData.username,
    dob: userData.dob,
    profileImage: userData.profileImage,
  };
}

export function deleteUserModel(userId: number) {
  return {
    userId,
  };
}

export function changePasswordModel(
  userData: ChangePassword,
  userId: number,
): ChangePasswordInput {
  return {
    userId,
    currentPassword: userData.currentPassword,
    newPassword: userData.newPassword,
  };
}
