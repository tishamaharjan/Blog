import sql from "mssql";
import bcrypt from "bcrypt";
import { getDB } from "../config/db.js";

export async function registerUser(user) {
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
  } catch (e) {
    // MSSQL unique constraint violation codes
    // Duplicate key / unique constraint violation
    if (e.number === 2627 || e.number === 2601) {
      throw {
        status: 409,
        message: "Email already registered.",
      };
    }

    throw e;
  }
}
