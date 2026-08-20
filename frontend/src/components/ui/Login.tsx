import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import LoginButton from "../button/LoginButton";
import { authApi } from "../../api";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setApiError(null);
    setIsSubmitting(true);
    try {
      const response = await authApi.login({
        email: data.email,
        password: data.password,
      });
      console.log("response login", response);

      navigate("/home");
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Invalid email or password",
      );
      console.log(error);
      alert("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col justify-center text-center">
      Login
      <div className="flex flex-col mt-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#EAEFEF] flex flex-col gap-1 border-2 md:w-1/3 mx-auto p-5 rounded-[10px]"
        >
          <>
            <label>Email:</label>
            <input
              type="text"
              placeholder="Email"
              className="border-1 px-1 rounded-[5px] w-[95%] bg-white"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">Email is required</span>
            )}
          </>

          <>
            <label>Password:</label>
            <div className="border-1 flex items-center rounded-[5px] w-[95%] focus-within:border-2 bg-white">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="px-1 rounded-[5px] w-full bg-transparent outline-none"
                {...register("password", {
                  required: true,
                })}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                color="gray"
                className="cursor-pointer mr-1"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            {errors.password && (
              <span className="text-red-500 text-xs">Password is required</span>
            )}
          </>

          {apiError && <span className="text-red-500 text-xs">{apiError}</span>}
          <LoginButton text={isSubmitting ? "Logging in..." : "Login"} />
        </form>
        <a href="/register" className="mt-3 underline text-[#A7C1A8]">
          Register user? Click here.
        </a>
      </div>
    </div>
  );
};

export default Login;
