import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  const onAddBlog = () => {
    navigate("/addblog");
  };
  return (
    <div className="flex flex-col justify-center">
      <button
        className="bg-[#819A91] rounded-2xl p-2 cursor-pointer ml-auto mr-2"
        onClick={onAddBlog}
      >
        +Add Blog
      </button>
    </div>
  );
};

export default Blog;
