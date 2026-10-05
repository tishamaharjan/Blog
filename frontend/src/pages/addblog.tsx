import React, { useState } from "react";
import Button from "../components/ui/Button";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      return;
    }

    try {
      const formData = new FormData();

      formData.append("userId", "19");
      formData.append("blogDetail", description);
      formData.append("title", title);
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

      console.log("Blog added:", data);

      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7F6] flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold text-[#36413D] text-center mb-2">
          Add Blog
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Create and share a new blog post.
        </p>

        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-2 mx-auto border border-gray-200 p-6 sm:p-8 rounded-2xl bg-white shadow-lg"
        >
          <label className="text-sm font-medium text-gray-700">Title:</label>

          <input
            className="h-11 px-3 rounded-lg border border-gray-300 w-full bg-white outline-none transition focus:border-[#738A81] focus:ring-2 focus:ring-[#738A81]/20"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="text-sm font-medium text-gray-700 mt-2">
            Description:
          </label>

          <textarea
            className="px-3 py-2 rounded-lg border border-gray-300 w-full h-[140px] bg-white outline-none resize-none transition focus:border-[#738A81] focus:ring-2 focus:ring-[#738A81]/20"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label className="text-sm font-medium text-gray-700 mt-2">
            Image:
          </label>

          <input
            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-600 file:mr-3 file:border-0 file:rounded-md file:bg-[#738A81] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-[#627A71] transition"
            type="file"
            name="Image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            required
          />

          <Button variant="add" className="cursor-pointer mt-3 ml-auto w-fit">
            + Add Blog
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
