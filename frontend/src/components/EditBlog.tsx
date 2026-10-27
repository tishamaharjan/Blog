import React, { useState } from "react";
import Button from "./ui/Button";
import { useToast } from "../context/ToastContext";
import ImageUpload from "./ui/ImageUpload";

type Blog = {
  BlogID: number;
  UserID: number;
  BlogTitle: string;
  BlogDetail: string;
  BlogImage: string;
};

type EditBlogProps = {
  userId: number;
  blog: Blog;
  onEditBlog: () => void;
  onCancel: () => void;
};

const EditBlog = ({ userId, blog, onEditBlog, onCancel }: EditBlogProps) => {
  const [description, setDescription] = useState(blog.BlogDetail);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("userId", String(userId));
      formData.append("blogId", String(blog.BlogID));
      formData.append("blogDetail", description);
      formData.append("uploadDate", new Date().toISOString());

      if (image) {
        formData.append("image", image);
      } else {
        formData.append("existingBlogImage", blog.BlogImage);
      }

      const response = await fetch(
        "http://localhost:3000/api/blogs/update-blog",
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update blog");
      }

      showToast("Blog updated successfully!", "success");
      onEditBlog();
    } catch (error) {
      console.error("Error updating blog:", error);

      showToast(
        error instanceof Error
          ? error.message
          : "Failed to update blog. Please try again.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 mx-auto border border-[var(--color-border)] p-6 sm:p-8 rounded-2xl bg-[var(--color-surface)] shadow-lg w-full max-w-xl"
    >
      {blog.BlogImage?.startsWith("http") ? (
        <img
          src={blog.BlogImage}
          alt={blog.BlogTitle}
          className="w-full max-h-[200px] object-cover rounded-lg"
        />
      ) : (
        <ImageUpload variant="rectangle" value={image} onChange={setImage} />
      )}

      <span>
        <label className="text-sm font-medium text-[var(--color-text-primary)]">
          About blog:
        </label>

        <textarea
          className="px-3 py-2 rounded-lg border border-[var(--color-input-border)] w-full h-[140px] bg-[var(--color-input-bg)] text-[var(--color-text-primary)] outline-none resize-none transition focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/20"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </span>

      <div className="flex gap-3">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>

        <Button
          variant="add"
          type="submit"
          loading={loading}
          disabled={loading}
          className="cursor-pointer mt-3"
        >
          Update Blog
        </Button>
      </div>
    </form>
  );
};

export default EditBlog;
