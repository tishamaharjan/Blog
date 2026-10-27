import { useState } from "react";

type Blog = {
  BlogID: number;
  UserID: number;
  Username: string;
  BlogTitle: string;
  BlogDetail: string;
  BlogImage: string;
};

type BlogCardProps = {
  blog: Blog;
  onEdit?: (blog: Blog) => void;
  onDelete?: (blog: Blog) => void;
};

const BlogCard = ({ blog, onEdit, onDelete }: BlogCardProps) => {
  const [showMenu, setShowMenu] = useState(false);

  // if (!onEdit && !onDelete) {
  //   setShowMenu(false);
  // }

  console.log("blog", typeof blog.BlogID);

  const handleDelete = () => {
    setShowMenu(false);

    const confirmed = window.confirm(
      "Are you sure you want to delete this blog? All comments and likes associated with it will also be deleted.",
    );

    if (confirmed && onDelete) {
      onDelete(blog);
    }
  };

  return (
    <div className="flex flex-col mx-auto mt-6 p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-md min-h-[300px] w-full max-w-[600px] transition-shadow hover:shadow-lg">
      <div className="flex flex-col gap-2">
        {/* Blog Header */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-[var(--color-secondary)]">
            {blog.Username}
          </p>
          {/* Three-dot menu */}
          {onEdit && onDelete && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMenu((prev) => !prev)}
                className="w-9 h-9 flex cursor-pointer items-center justify-center rounded-full text-xl text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)] transition-colors"
                aria-label="Blog options"
                aria-expanded={showMenu}
              >
                ⋮
              </button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-36 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg z-10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      onEdit?.(blog);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg)] transition-colors"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full px-4 py-2.5 text-left text-sm text-[var(--color-danger)] hover:bg-[var(--color-danger-bg)] transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-lg font-semibold text-[var(--color-text-primary)]">
          {blog.BlogTitle}
        </p>

        <p className="text-base text-[var(--color-text-secondary)]">
          {blog.BlogDetail}
        </p>

        {blog.BlogImage && (
          <img
            src={blog.BlogImage}
            alt={blog.BlogTitle}
            className="w-full max-h-[350px] object-cover rounded-xl"
          />
        )}
      </div>
    </div>
  );
};

export default BlogCard;
