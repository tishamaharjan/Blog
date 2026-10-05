import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";

const Blog = () => {
  const navigate = useNavigate();
  const onAddBlog = () => {
    navigate("/addblog");
  };
  return (
    <div className="flex justify-left">
      <Button
        variant="add"
        className="cursor-pointer ml-auto w-fit"
        onClick={onAddBlog}
      >
        + Add Blog
      </Button>
    </div>
  );
};

export default Blog;
