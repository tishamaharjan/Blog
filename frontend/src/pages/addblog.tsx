import React, { useEffect, useState } from "react";
import AddButton from "../components/button/AddButton";

const AddBlog = () => {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const keys = Object.keys(localStorage)
      .filter((key) => key.startsWith("blog_"))
      .map((key) => Number(key.replace("blog_", "")));
    const lastId = keys.length > 0 ? Math.max(...keys) : 0;
    setId(lastId + 1);
  }, []);

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

      setTitle("");
      setDescription("");
      setImage(null);

      setId((prev) => prev + 1);
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
          readOnly
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
        <AddButton text="Add Blog" className="w-full" />
      </form>
    </div>
  );
};

export default AddBlog;
