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
};

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <div className="flex flex-col mx-auto mt-6 p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-md min-h-[300px] w-full max-w-[600px] transition-shadow hover:shadow-lg">
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold text-[var(--color-secondary)]">
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
            alt={blog.BlogTitle}
            className="w-full max-h-[350px] object-cover rounded-xl"
          />
        )}
      </div>
    </div>
  );
};

export default BlogCard;
