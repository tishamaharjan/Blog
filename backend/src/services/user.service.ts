import sql from "mssql";
import bcrypt from "bcrypt";
import { getDB } from "../config/db.js";
import type {
  UserId,
  UpdateUser,
  User,
  ChangePassword,
} from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

const SALT_ROUNDS = 10;
const SQL_UNIQUE_VIOLATION_CODES = new Set([2627, 2601]);

export async function registerUser(user: User) {
  try {
    const pool = getDB();
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const result = await pool
      .request()
      .input("Username", sql.VarChar(255), user.username)
      .input("Email", sql.VarChar(255), user.email)
      .input("PhoneNumber", sql.VarChar(255), user.phoneNumber)
      .input("DOB", sql.VarChar(25), user.dob)
      .input("ProfileImage", sql.VarChar(255), user.profileImage)
      .input("Password", sql.VarChar(255), hashedPassword)
      .execute("RegisterUser");

    return {
      username: user.username,
      email: user.email,
    };
  } catch (e: any) {
    if (e.number === 2627 || e.number === 2601) {
      throw new AppError("Email already registered.", 409);
    }

    throw e;
  }
}

export async function getUserById(user: UserId) {
  const pool = getDB();

  const result = await pool
    .request()
    .input("UserID", sql.Int, user.userId)
    .execute("GetUserById");

  if (result.rowsAffected[0] === 0) {
    throw new AppError("User not found.", 404);
  }

  return result.recordset[0];
}

export async function updateUser(user: UpdateUser) {
  try {
    const pool = getDB();

    const result = await pool
      .request()
      .input("UserID", sql.Int, user.userId)
      .input("Username", sql.VarChar(255), user.username)
      .input("Email", sql.VarChar(255), user.email)
      .input("PhoneNumber", sql.VarChar(255), user.phoneNumber)
      .input("DOB", sql.VarChar(25), user.dob)
      .input("ProfileImage", sql.VarChar(255), user.profileImage)
      .execute("UpdateUser");

    if (result.recordset.length === 0) {
      throw new AppError("User not found.", 404);
    }

    return result.recordset[0];
  } catch (e: any) {
    if (e.message?.includes("Email already exists.")) {
      throw new AppError("Email already registered.", 409);
    }

    if (e.message?.includes("Phone number already exists")) {
      throw new AppError("Phone number already registered.", 409);
    }

    if (e.number === 2627 || e.number === 2601) {
      throw new AppError("Duplicate value.", 409);
    }

    throw e;
  }
}

export async function deleteUser(user: UserId) {
  const pool = getDB();

  const result = await pool
    .request()
    .input("UserID", sql.Int, user.userId)
    .execute("DeleteUser");

  if (result.rowsAffected[0] === 0) {
    throw new AppError("User not found.", 404);
  }

  return {
    message: "User deleted successfully.",
  };
}

export async function changePassword(user: ChangePassword) {
  const pool = getDB();

  const userResult = await pool
    .request()
    .input("UserID", sql.Int, user.userId)
    .execute("GetUserById");

  if (userResult.rowsAffected[0] === 0) {
    throw new AppError("User not found.", 404);
  }

  const passwordHash = userResult.recordset[0].Password;

  const isMatch = await bcrypt.compare(user.currentPassword, passwordHash);

  if (!isMatch) {
    throw new AppError("Current password is incorrect.", 401);
  }

  const hashedPassword = await bcrypt.hash(user.newPassword, SALT_ROUNDS);

  const result = await pool
    .request()
    .input("UserID", sql.Int, user.userId)
    .input("Password", sql.VarChar(255), hashedPassword)
    .execute("ChangePassword");

  return {
    message: "Password changed successfully.",
  };
}
