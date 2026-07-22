import sql from "mssql";
import { getDB } from "../config/db.js";
import { AppError } from "../utils/AppError.js";
import {
  CommentModel,
  GetCommentModel,
  UpdateCommentModel,
} from "../models/comment.model.js";

export async function addComment(comment: CommentModel) {
  try {
    const pool = getDB();

    const result = await pool
      .request()
      .input("UserId", sql.Int, comment.userId)
      .input("BlogId", sql.Int, comment.blogId)
      .input("Comment", sql.VarChar(255), comment.comment)
      .execute("AddComment");

    return {
      userId: comment.userId,
      blogId: comment.blogId,
      comment: comment.comment,
    };
  } catch (e) {
    throw e;
  }
}

export async function getCommentById(comment: GetCommentModel) {
  const pool = getDB();

  const result = await pool
    .request()
    .input("UserId", sql.Int, comment.userId)
    .input("BlogId", sql.Int, comment.blogId)
    .input("CommentId", sql.Int, comment.commentId)
    .execute("GetCommentById");

  if (result.rowsAffected[0] === 0) {
    throw new AppError("User, blog or comment not found.", 404);
  }

  return result.recordset[0];
}

export async function updateComment(comment: UpdateCommentModel) {
  try {
    const pool = getDB();

    const result = await pool
      .request()
      .input("UserId", sql.Int, comment.userId)
      .input("BlogId", sql.Int, comment.blogId)
      .input("CommentId", sql.Int, comment.commentId)
      .input("Comment", sql.VarChar(255), comment.comment)
      .execute("UpdateComment");

    return {
      userId: comment.userId,
      BlogId: comment.blogId,
      CommentId: comment.commentId,
      comment: comment.comment,
    };
  } catch (e) {
    throw e;
  }
}

export async function deleteComment(comment: GetCommentModel) {
  const pool = getDB();

  const result = await pool
    .request()
    .input("UserId", sql.Int, comment.userId)
    .input("BlogId", sql.Int, comment.blogId)
    .input("CommentId", sql.Int, comment.commentId)
    .execute("DeleteComment");

  if (result.rowsAffected[0] === 0) {
    throw new AppError("User, blog or comment not found.", 404);
  }

  return {
    message: "Comment deleted successfully.",
  };
}
