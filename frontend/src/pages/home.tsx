import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

type Blog = {
  BlogID: number;
  UserID: number;
  Username: string;
  BlogTitle: string;
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
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-text-secondary)]">
        Loading blogs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-danger)]">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-6">
      <div className="flex flex-col gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.BlogID}>
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium text-[var(--color-secondary)]">
                {blog.Username}
              </p>

              <p className="text-lg font-semibold text-[var(--color-text-primary)]">
                {blog.BlogTitle}
              </p>

              <p className="text-base text-[var(--color-text-secondary)]">
                {blog.BlogDetail}
              </p>

              {blog.BlogImage && (
                <img
                  src={blog.BlogImage}
                  alt={blog.BlogDetail}
                  className="w-full max-h-[350px] object-cover rounded-xl"
                />
              )}
            </div>
          </BlogCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
