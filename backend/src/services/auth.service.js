import sql from "mssql";
import bcrypt from "bcrypt";
import { getDB } from "../config/db.js";
import { generateToken } from "../utils/jwt.js";

export async function loginUser({ email, password }) {
  const pool = getDB();

  const result = await pool
    .request()
    .input("Email", sql.VarChar(255), email)
    .query(
      "SELECT UserID, Username, Email, Password FROM Users WHERE Email = @Email",
    );

  const user = result.recordset[0];

  if (!user) {
    throw { status: 401, message: "Invalid email or password." };
  }

  const isMatch = await bcrypt.compare(password, user.Password);

  if (!isMatch) {
    throw { status: 401, message: "Invalid email or password." };
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
