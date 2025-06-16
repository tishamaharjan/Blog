const Login = () => {
  return (
    <div className="flex flex-col justify-center text-center">
      Login
      <div className="flex flex-col justify-center mt-5">
        <form
          action="onSubmit"
          className="bg-[#EAEFEF] border-2 w-1/3 mx-auto p-5 rounded-[10px]"
        >
          <label>Email:</label>
          <input
            type="text"
            placeholder="Email"
            className="border-1 px-1 rounded-[5px] bg-white"
          />
          <label>Password:</label>
          <input
            type="text"
            placeholder="Email"
            className="border-1 px-1 rounded-[5px] bg-white"
          />
          <button
            type="submit"
            className="bg-[#A7C1A8] text-white p-1 rounded-[5px] mt-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
