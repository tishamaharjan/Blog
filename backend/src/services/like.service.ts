import sql from "mssql";
import { ToggleLikeModel } from "../models/like.model.js";
import { getDB } from "../config/db.js";

export async function toggleLikeService(like: ToggleLikeModel) {
  try {
    const pool = getDB();

    const result = await pool
      .request()
      .input("UserId", sql.Int, like.userId)
      .input("BlogId", sql.Int, like.blogId)
      .input("CommentId", sql.Int, like.commentId ?? null)
      .execute("ToggleLike");

    return result.recordset[0];
  } catch (e) {
    throw e;
  }
}
