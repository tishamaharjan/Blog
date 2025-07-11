import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const schema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .regex(emailRegex, { message: "Invalid email" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters long" }),
    confirmPassword: z.string().min(1, { message: "Password should match" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const onSubmit = (data: FormData) => {
    try {
      const result = schema.safeParse({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      if (!result.success) {
        result.error.issues.map((issue) => console.log(issue.message));
        alert("Invalid email or password");
      } else {
        localStorage.setItem(
          "user_" + data.email,
          JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password,
          })
        );
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-col justify-center text-center">
      Register
      <div className="flex flex-col  mt-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#EAEFEF] flex flex-col gap-1 border-2 w-1/3 mx-auto p-5 rounded-[10px]"
        >
          <>
            <label>Username:</label>
            <input
              type="text"
              placeholder="Username"
              {...register("username")}
              className="border-1 px-1 rounded-[5px] w-[95%] bg-white"
            />
            {errors.username && (
              <span className="text-red-500 text-xs">
                {errors.username.message}
              </span>
            )}
          </>

          <>
            <label>Email:</label>
            <input
              type="text"
              placeholder="Email"
              {...register("email")}
              className="border-1 px-1 rounded-[5px] w-[95%] bg-white"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </>

          <>
            <label>Password:</label>
            <div className="border-1 flex items-center rounded-[5px] w-[95%] focus-within:border-2 bg-white">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="px-1 rounded-[5px] w-full bg-transparent outline-none"
                {...register("password")}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                color="gray"
                className="cursor-pointer mr-1"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </>

          <>
            <label>Confirm Password:</label>
            <div className="border-1 flex items-center rounded-[5px] w-[95%] focus-within:border-2 bg-white">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current Password"
                className="px-1 rounded-[5px] w-full bg-transparent outline-none"
                {...register("confirmPassword")}
              />
              <FontAwesomeIcon
                icon={showCurrentPassword ? faEyeSlash : faEye}
                color="gray"
                className="cursor-pointer mr-1"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              />
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </span>
            )}
          </>

          <>
            <button
              type="submit"
              className="bg-[#A7C1A8] text-white p-1 rounded-[5px] mt-3 w-full cursor-pointer"
            >
              Register
            </button>
          </>
        </form>
        <a href="/" className="mt-3 underline text-[#A7C1A8]">
          To login Click here.
        </a>
      </div>
    </div>
  );
};

export default Register;
