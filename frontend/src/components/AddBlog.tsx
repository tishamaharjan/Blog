import React, { useState } from "react";
import Button from "./ui/Button";
import { useToast } from "../context/ToastContext";
import ImageUpload from "./ui/ImageUpload";

type AddBlogProps = {
  userId: number;
  onBlogAdded: () => void;
};

const AddBlog = ({ userId, onBlogAdded }: AddBlogProps) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const { showToast } = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      showToast("Please select an image.", "warning");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("userId", String(userId));
      formData.append("blogDetail", description);
      formData.append("image", image);
      formData.append("uploadDate", new Date().toISOString());

      const response = await fetch("http://localhost:3000/api/blogs/add-blog", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add blog");
      }

      setDescription("");
      setImage(null);

      showToast("Blog added successfully!", "success");

      onBlogAdded();
    } catch (error) {
      console.error("Error adding blog:", error);

      showToast(
        error instanceof Error
          ? error.message
          : "Failed to add blog. Please try again.",
        "error",
      );
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 mx-auto border border-[var(--color-border)] p-6 sm:p-8 rounded-2xl bg-[var(--color-surface)] shadow-lg w-full max-w-xl"
    >
      <ImageUpload variant="rectangle" value={image} onChange={setImage} />
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

      <Button variant="add" type="submit" className="cursor-pointer mt-3 ">
        + Add Blog
      </Button>
    </form>
  );
};

export default AddBlog;
