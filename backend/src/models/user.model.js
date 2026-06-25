export function createUserModel(userData) {
  return {
    username: userData.username,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    dob: userData.dob,
    profileImage: userData.profileImage,
    password: userData.password,
  };
}
