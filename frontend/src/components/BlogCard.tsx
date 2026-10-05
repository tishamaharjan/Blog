const BlogCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col mx-auto mt-6 p-5 rounded-2xl bg-white border border-gray-200 shadow-md min-h-[300px] w-full max-w-[600px] transition-shadow hover:shadow-lg">
      {children}
    </div>
  );
};

export default BlogCard;
