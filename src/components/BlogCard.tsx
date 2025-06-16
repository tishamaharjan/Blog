const BlogCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col mt-5 p-3 rounded-[10px] bg-[#EAEFEF] min-h-[300px] w-[600px]">
      {children}
    </div>
  );
};

export default BlogCard;
