import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem(
      "user_" + username,
      JSON.stringify({ username, email, password })
    );
    navigate("/");
  };
  return (
    <div className="flex flex-col justify-center text-center">
      Register
      <div className="flex flex-col  mt-5">
        <form
          onSubmit={onSubmit}
          className="bg-[#EAEFEF] border-2 w-1/3 mx-auto p-5 rounded-[10px]"
        >
          <label>Username:</label>
          <input
            type="text"
            placeholder="Username"
            className="border-1 px-1 rounded-[5px] w-[95%] bg-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Email:</label>
          <input
            type="text"
            placeholder="Email"
            className="border-1 px-1 rounded-[5px] w-[95%] bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            className="border-1 px-1 rounded-[5px] w-[95%] bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#A7C1A8] text-white p-1 rounded-[5px] mt-3 w-full cursor-pointer"
          >
            Register
          </button>
        </form>
        <a href="/" className="mt-3 underline text-[#A7C1A8]">
          To login Click here.
        </a>
      </div>
    </div>
  );
};

export default Register;
