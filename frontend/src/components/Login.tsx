import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/home");
  };
  return (
    <div className="flex flex-col justify-center text-center">
      Login
      <div className="flex flex-col mt-5">
        <form
          onSubmit={onSubmit}
          className="bg-[#EAEFEF] border-2 w-1/3 mx-auto p-5 rounded-[10px]"
        >
          <label>Email:</label>
          <input
            type="text"
            placeholder="Email"
            className="border-1 px-1 rounded-[5px] w-[95%] bg-white"
            required
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            className="border-1 px-1 rounded-[5px] w-[95%] bg-white"
            required
          />
          <button
            type="submit"
            className="bg-[#A7C1A8] text-white p-1 rounded-[5px] mt-3 w-full cursor-pointer"
          >
            Login
          </button>
        </form>
        <a href="/register" className="mt-3 underline text-[#A7C1A8]">
          Register user? Click here.
        </a>
      </div>
    </div>
  );
};

export default Login;
