import { useEffect, useState } from "react";

import Button from "../components/ui/Button";
import AddBlog from "../components/AddBlog";
import BlogCard from "../components/BlogCard";
import { userApi } from "../api";

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

const Blog = () => {
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  const getUserBlogs = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/blogs/get-blogs/${id}`,
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

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const { data: loggedInUser } = await userApi.getMe();

        setUserId(loggedInUser.userId);

        await getUserBlogs(loggedInUser.userId);
      } catch (error) {
        console.error(error);
        setError("Failed to load blogs");
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const handleBlogAdded = async () => {
    setShowAddBlog(false);

    if (userId !== null) {
      await getUserBlogs(userId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-6">
      <div className="flex justify-end mb-6">
        <Button
          variant="add"
          className="cursor-pointer w-fit"
          onClick={() => setShowAddBlog(true)}
        >
          + Add Blog
        </Button>
      </div>

      {showAddBlog && userId !== null && (
        <div className="mb-8">
          <AddBlog userId={userId} onBlogAdded={handleBlogAdded} />
        </div>
      )}

      {!showAddBlog && blogs.length > 0 && (
        <section>
          {error && <p className="text-[var(--color-danger)]">{error}</p>}

          {!error && blogs.length === 0 && (
            <p className="text-[var(--color-text-secondary)]">
              You haven't created any blogs yet.
            </p>
          )}

          {!error && blogs.length > 0 && (
            <div className="flex flex-col gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog.BlogID} blog={blog} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Blog;
