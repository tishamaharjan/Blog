import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import { AppError } from "../utils/AppError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a locally-saved file (from multer diskStorage) to Cloudinary
 * and returns the public URL to persist in the database.
 * Deletes the local temp file afterwards either way.
 */
export async function uploadImageAndGetUrl(
  localFilePath: string,
): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "blogs",
      resource_type: "image",
    });

    return result.secure_url;
  } catch (e) {
    throw new AppError("Failed to upload image.", 500);
  } finally {
    // Clean up the temp file on disk regardless of success/failure
    await fs.unlink(localFilePath).catch(() => {});
  }
}
