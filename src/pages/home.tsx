import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
type Blog = {
  id: number;
  title: string;
  description: string;
  image: string;
};
const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    const allBlogs = [];

    for (let i = 0; i < localStorage.length; i++) {
      const stringkey = localStorage.key(i);
      if (!stringkey?.startsWith("blog")) {
        continue;
      }
      const value = localStorage.getItem(stringkey);

      try {
        if (!value) {
          continue;
        }
        const data = JSON.parse(value);
        allBlogs.push(data);
      } catch (e) {
        console.log(e);
      }

      setBlogs(allBlogs);
    }
  }, []);
  return (
    <div className="flex p-5 gap-8 justify-center flex-wrap">
      {blogs.map((blog, index) => (
        <BlogCard key={index}>
          <h1>Blog Number: {blog.id}</h1>
          <h1>Blog is about: {blog.title}</h1>
          <p>{blog.description}</p>
          {blog.image && <img src={blog.image} className="rounded-[10px]" />}
        </BlogCard>
      ))}
    </div>
  );
};

export default Home;
