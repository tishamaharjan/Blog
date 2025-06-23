const BlogCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col mx-auto mt-5 p-3 rounded-[10px] bg-[#e0e8cf] min-h-[300px] w-[500px]">
      {children}
    </div>
  );
};

export default BlogCard;
