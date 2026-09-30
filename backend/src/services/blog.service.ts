import sql from "mssql";
import { getDB } from "../config/db.js";
import { Blog, GetBlog, UpdateBlog } from "../models/blog.model.js";
import { AppError } from "../utils/AppError.js";

export async function addBlog(blog: Blog) {
  const pool = getDB();

  const result = await pool
    .request()
    .input("UserId", sql.Int, blog.userId)
    .input("BlogDetail", sql.VarChar(255), blog.blogDetail)
    .input("BlogImage", sql.VarChar(255), blog.blogImage)
    .input("UploadDate", sql.VarChar(255), blog.uploadDate)
    .execute("AddBlog");

  if (result.rowsAffected[0] === 0) {
    throw new AppError("Failed to create blog.", 500);
  }

  return blog;
}

export async function getBlogById(blog: GetBlog) {
  const pool = getDB();

  const result = await pool
    .request()
    .input("UserId", sql.Int, blog.userId)
    .input("BlogId", sql.Int, blog.blogId)
    .execute("GetBlogById");

  if (result.recordset.length === 0) {
    throw new AppError("User or blog not found.", 404);
  }
  return result.recordset[0];
}

export async function getAllBlogs() {
  const pool = getDB();

  const result = await pool.request().execute("GetAllBlog");

  return result.recordset;
}

export async function updateBlog(blog: UpdateBlog) {
  const pool = getDB();

  const result = await pool
    .request()
    .input("UserId", sql.Int, blog.userId)
    .input("BlogId", sql.Int, blog.blogId)
    .input("BlogDetail", sql.VarChar(255), blog.blogDetail)
    .input("BlogImage", sql.VarChar(255), blog.blogImage)
    .input("UploadDate", sql.VarChar(255), blog.uploadDate)
    .execute("UpdateBlog");

  if (result.rowsAffected[0] === 0) {
    throw new AppError("User or blog not found.", 404);
  }

  return blog;
}

export async function deleteBlog(blog: GetBlog) {
  const pool = getDB();

  const result = await pool
    .request()
    .input("UserId", sql.Int, blog.userId)
    .input("BlogId", sql.Int, blog.blogId)
    .execute("DeleteBlog");

  if (result.rowsAffected[0] === 0) {
    throw new AppError("User or blog not found.", 404);
  }

  return {
    message: "Blog deleted successfully.",
  };
}
