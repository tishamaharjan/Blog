import React, { useState } from "react";
import Button from "./ui/Button";
import { useToast } from "../context/ToastContext";

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
      className="flex flex-col gap-2 mx-auto border border-[var(--color-border)] p-6 sm:p-8 rounded-2xl bg-[var(--color-surface)] shadow-lg w-full max-w-xl"
    >
      <label className="text-sm font-medium text-[var(--color-text-primary)]">
        Description:
      </label>

      <textarea
        className="px-3 py-2 rounded-lg border border-[var(--color-input-border)] w-full h-[140px] bg-[var(--color-input-bg)] text-[var(--color-text-primary)] outline-none resize-none transition focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/20"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label className="text-sm font-medium text-[var(--color-text-primary)] mt-2">
        Image:
      </label>

      <input
        className="w-full px-3 py-2 rounded-lg border border-[var(--color-input-border)] bg-[var(--color-input-bg)] text-sm text-[var(--color-text-secondary)] file:mr-3 file:border-0 file:rounded-md file:bg-[var(--color-secondary)] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-[var(--color-secondary-hover)] transition"
        type="file"
        name="Image"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        required
      />

      <Button variant="add" type="submit" className="cursor-pointer mt-3 ">
        + Add Blog
      </Button>
    </form>
  );
};

export default AddBlog;
