import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const Blog = () => {
  const navigate = useNavigate();

  const onAddBlog = () => {
    navigate("/addblog");
  };

  return (
    <div className="h-28 w-1/3 ml-auto bg-[var(--color-bg)] px-4 py-6 flex justify-end">
      <Button
        variant="add"
        className="cursor-pointer w-fit"
        onClick={onAddBlog}
      >
        + Add Blog
      </Button>
    </div>
  );
};

export default Blog;
