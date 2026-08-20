import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

type Blog = {
  BlogID: number;
  UserID: number;
  BlogDetail: string;
  BlogImage: string;
};

type BlogResponse = {
  success: boolean;
  data: Blog[];
};

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/blogs/get-all-blogs",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const result: BlogResponse = await response.json();

        setBlogs(result.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    getAllBlogs();
  }, []);

  if (loading) {
    return <div>Loading blogs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {blogs.map((blog) => (
        <BlogCard key={blog.BlogID}>
          <div>
            <p>Blog Number: {blog.BlogID}</p>

            <p>Blog is about: {blog.BlogDetail}</p>

            {blog.BlogImage && (
              <img src={blog.BlogImage} alt={blog.BlogDetail} />
            )}
          </div>
        </BlogCard>
      ))}
    </div>
  );
};

export default Home;
