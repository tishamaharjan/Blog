import sql from "mssql";
import bcrypt from "bcrypt";
import { getDB } from "../config/db.js";
import { generateToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const pool = getDB();

  const result = await pool
    .request()
    .input("Email", sql.VarChar(255), email)
    .execute("LoginUser");

  const user = result.recordset[0];

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  const isMatch = await bcrypt.compare(password, user.Password);

  if (!isMatch) {
    throw new AppError("Invalid email or password.", 401);
  }

  const token = generateToken({
    userId: user.UserID,
    email: user.Email,
  });

  return {
    token,
    user: {
      userId: user.UserID,
      username: user.Username,
      email: user.Email,
    },
  };
}
