const AddButton = ({
  text,
  className,
  onClick,
}: {
  text: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`bg-[#738a81] mr-3 w-[50%] p-1 rounded-[5px] mt-3 cursor-pointer ${className || ""}`}
    >
      <span className="text-white">+ {text}</span>
    </button>
  );
};

export default AddButton;
