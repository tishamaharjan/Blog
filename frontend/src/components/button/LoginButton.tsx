const LoginButton = ({ text }: { text: string }) => {
  return (
    <button
      type="submit"
      className="bg-[#819A91] text-white p-1 rounded-[5px] mt-3 w-full cursor-pointer"
    >
      {text}
    </button>
  );
};

export default LoginButton;
