import { useNavigate } from "react-router-dom";
import AddButton from "../components/button/AddButton";

const Blog = () => {
  const navigate = useNavigate();
  const onAddBlog = () => {
    navigate("/addblog");
  };
  return (
    <div className="flex justify-left">
      <AddButton
        text="Add Blog"
        className="cursor-pointer ml-auto w-fit"
        onClick={onAddBlog}
      />
    </div>
  );
};

export default Blog;
