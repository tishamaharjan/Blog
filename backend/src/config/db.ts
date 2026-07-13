import sql from "mssql";
import { env } from "./env.js";
import { AppError } from "../utils/AppError.js";

const config: sql.config = {
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  server: env.DB_SERVER,
  database: env.DB_DATABASE,
  options: {
    encrypt: env.DB_ENCRYPT,
    trustServerCertificate: env.DB_TRUST_SERVER_CERTIFICATE,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30_000,
  },
};

let pool: sql.ConnectionPool | null = null;
let connecting: Promise<sql.ConnectionPool> | null = null;

export async function connectDB(): Promise<sql.ConnectionPool> {
  if (pool) return pool;
  if (connecting) return connecting;

  connecting = sql
    .connect(config)
    .then((newPool) => {
      pool = newPool;
      console.log("Database connected!");

      pool.on("error", (err) => {
        console.error("DB pool error, resetting pool:", err);
        pool = null;
      });

      return newPool;
    })
    .catch((err) => {
      console.error("Error connecting to database:", err);
      throw err;
    })
    .finally(() => {
      connecting = null;
    });

  return connecting;
}

export function getDB(): sql.ConnectionPool {
  if (!pool) {
    throw new AppError("Database not connected yet.", 503);
  }
  return pool;
}

export async function closeDB(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
    console.log("Database connection closed.");
  }
}

export default sql;
