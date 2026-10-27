import { useEffect, useState } from "react";

import Button from "../components/ui/Button";
import AddBlog from "../components/AddBlog";
import BlogCard from "../components/BlogCard";
import { userApi } from "../api";
import EditBlog from "../components/EditBlog";
import { useToast } from "../context/ToastContext";

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
  const [userId, setUserId] = useState<number | null>(null);

  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const { showToast } = useToast();

  const getUserBlogs = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/blogs/get-blogs/${id}`,
        { credentials: "include" },
      );

      if (!response.ok) {
        showToast("Failed to fetch blogs. Please try again later", "error");
        throw new Error("Failed to fetch blogs");
      }

      const result: BlogResponse = await response.json();
      setBlogs(result.data);
    } catch (error) {
      console.error(error);
      showToast("Failed to load blogs. Please try again later", "error");
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

  const handleDeleteBlog = async (blog: Blog) => {
    const test = JSON.stringify({
      bserId: blog.UserID,
      blogId: blog.BlogID,
    });

    console.log("test", test);

    try {
      const response = await fetch(
        "http://localhost:3000/api/blogs/delete-blog",
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: blog.UserID,
            blogId: blog.BlogID,
          }),
        },
      );

      const result = await response.json();
      if (!response.ok) {
        showToast(result.message || "Failed to delete blog", "error");
        return;
      }

      showToast(result.message || "Blog deleted successfully", "success");

      // Remove deleted blog from UI
      setBlogs((prev) => prev.filter((item) => item.BlogID !== blog.BlogID));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        Loading blogs...
      </div>
    );
  }

  const handleBlogUpdated = async () => {
    setEditingBlog(null);

    if (userId !== null) {
      await getUserBlogs(userId);
    }
  };

  const handleCancelEdit = () => {
    setEditingBlog(null);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-6">
      {!showAddBlog && !editingBlog && (
        <div className="flex justify-end mb-6">
          <Button
            variant="add"
            className="cursor-pointer w-fit"
            onClick={() => setShowAddBlog(true)}
          >
            + Add Blog
          </Button>
        </div>
      )}

      {showAddBlog && userId !== null ? (
        <div className="mb-8">
          <AddBlog userId={userId} onBlogAdded={handleBlogAdded} />
        </div>
      ) : editingBlog ? (
        <div className="mb-8">
          <EditBlog
            userId={userId!}
            blog={editingBlog}
            onEditBlog={handleBlogUpdated}
            onCancel={handleCancelEdit}
          />
        </div>
      ) : (
        <section>
          {blogs.length > 0 && (
            <div className="flex flex-col gap-6">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog.BlogID}
                  blog={blog}
                  onEdit={handleEditBlog}
                  onDelete={handleDeleteBlog}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Blog;
