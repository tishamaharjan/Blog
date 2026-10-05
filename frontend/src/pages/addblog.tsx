import React, { useState } from "react";
import Button from "../components/button/Button";

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
    <div className="flex flex-col justify-center">
      <div className="flex mx-auto">AddBlog</div>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2 mx-auto border-2 p-5 rounded-3xl bg-[#e0e8cf]"
      >
        <label>Title:</label>

        <input
          className="border-1 rounded-[5px] w-[95%] bg-[#e9efe0]"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description:</label>

        <textarea
          className="border-1 rounded-[5px] w-[95%] h-[100px] bg-[#e9efe0]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Image:</label>

        <input
          className="border-1 px-2 rounded-[10px] w-[95%] bg-[#e9efe0]"
          type="file"
          name="Image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          required
        />

        <Button variant="add" className="cursor-pointer ml-auto w-fit">
          + Add Blog
        </Button>
      </form>
    </div>
  );
};

export default AddBlog;
