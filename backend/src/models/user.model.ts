export type User = {
  username: string;
  email: string;
  phoneNumber: string;
  dob: string;
  profileImage?: string | undefined;
  password: string;
};

export type UpdateUser = {
  userId: number;
  username: string;
  email: string;
  phoneNumber: string;
  dob: string;
  profileImage?: string;
};

export type UserId = {
  userId: number;
};

export type ChangePassword = {
  userId: number;
  currentPassword: string;
  newPassword: string;
};

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

export function updateUserModel(userData: UpdateUser) {
  return {
    userId: userData.userId,
    username: userData.username,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    dob: userData.dob,
    profileImage: userData.profileImage,
  };
}

export function deleteUserModel(userData: UserId) {
  return {
    userId: userData.userId,
  };
}

export function changePasswordModel(userData: ChangePassword) {
  return {
    userId: userData.userId,
    currentPassword: userData.currentPassword,
    newPassword: userData.newPassword,
  };
}
