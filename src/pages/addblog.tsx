import React, { useState } from "react";

const AddBlog = () => {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;

    const reader = new FileReader();

    reader.readAsDataURL(image);
    reader.onloadend = () => {
      const base64Image = reader.result as string;

      const blog = {
        id,
        title,
        description,
        image: base64Image,
      };
      localStorage.setItem("blog_" + id, JSON.stringify(blog));

      setId(0);
      setTitle("");
      setDescription("");
      setImage(null);
    };
  };
  return (
    <div className="flex flex-col justify-center ">
      <div className="flex mx-auto">AddBlog</div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2 mx-auto border-2 p-5 rounded-3xl bg-[#e0e8cf]"
      >
        <label className="">Id:</label>
        <input
          className="border-1 rounded-[5px] w-[95%] bg-[#e9efe0]"
          type="number"
          value={id}
          onChange={(e) => setId(Number(e.target.value))}
          required
        />
        <label className="">Title:</label>
        <input
          className="border-1 rounded-[5px] w-[95%] bg-[#e9efe0]"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          className="border-1 rounded-[5px] w-[95%] h-[100px] bg-[#e9efe0]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Image:</label>
        <input
          className="border-1 px-2 rounded-[10px] w-[95%] bg-[#e9efe0]"
          type="file"
          name="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          required
        />
        <button
          type="submit"
          className="bg-[#A7C1A8] mx-auto w-[50%] text-white p-1 rounded-[5px] mt-3 cursor-pointer"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
