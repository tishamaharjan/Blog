import dotenv from "dotenv";
dotenv.config();
import sql from "mssql";

const requiredEnvVars = ["DB_USER", "DB_PASSWORD", "DB_SERVER", "DB_DATABASE"];
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool;
export async function connectDB() {
  try {
    if (!pool) {
      pool = await sql.connect(config);
      console.log("Database connected!");

      pool.on("error", (err) => {
        console.error("DB pool error, resetting pool:", err);
        pool = null; // forces reconnect attempt on next getDB/connectDB call
      });
    }
    return pool;
  } catch (e) {
    console.log("Error connecting database:", e);
    throw e;
  }
}

export function getDB() {
  if (!pool) {
    throw new Error("Database not connected yet. Call connectDB() first.");
  }
  return pool;
}

export default sql;
