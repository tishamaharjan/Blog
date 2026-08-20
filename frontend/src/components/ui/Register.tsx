import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LoginButton from "../button/LoginButton";
import { authApi } from "../../api";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  dob: string;
  profileImage: string;
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
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(1, { message: "Password should match" }),
    phoneNumber: z
      .string()
      .min(7, { message: "Phone number is required" })
      .regex(/^\d{10}$/, { message: "Invalid phone number" }),
    dob: z.string().min(1, { message: "Date of birth is required" }),
    profileImage: z.string().min(1, { message: "Profile image is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    setApiError(null);
    setIsSubmitting(true);
    try {
      const response = await authApi.register({
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dob: data.dob,
        profileImage: data.profileImage,
        password: data.password,
      });
      console.log("response", response);

      navigate("/");
    } catch (e) {
      console.log(e);
      setApiError(e instanceof Error ? e.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };
  // width must be adjusted
  return (
    <div className="flex flex-col justify-center text-center">
      Register
      <div className="flex flex-col mt-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#EAEFEF] flex flex-col gap-1 border-2 md:w-1/3  mx-auto p-5 rounded-[10px]"
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
            <label>Phone Number:</label>
            <input
              {...register("phoneNumber")}
              type="tel"
              placeholder="Phone Number"
              className="border-1 px-1 rounded-[5px] w-[95%] bg-white"
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-xs">
                {errors.phoneNumber.message}
              </span>
            )}
          </>

          <>
            <label>Date of Birth:</label>
            <input
              {...register("dob")}
              type="date"
              className="border-1 px-1 rounded-[5px] w-[95%] bg-white"
            />
            {errors.dob && (
              <span className="text-red-500 text-xs">{errors.dob.message}</span>
            )}
          </>

          <>
            <label>Profile Image:</label>
            <input
              {...register("profileImage")}
              type="text"
              placeholder="Image URL"
              className="border-1 px-1 rounded-[5px] w-[95%] bg-white"
            />
            {errors.profileImage && (
              <span className="text-red-500 text-xs">
                {errors.profileImage.message}
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

          {apiError && <span className="text-red-500 text-xs">{apiError}</span>}
          <LoginButton text={isSubmitting ? "Registering..." : "Register"} />
        </form>
        <a href="/" className="mt-3 underline text-[#A7C1A8]">
          To login Click here.
        </a>
      </div>
    </div>
  );
};

export default Register;
