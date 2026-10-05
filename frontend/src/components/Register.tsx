import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { authApi } from "../api";
import Button from "./ui/Button";
import Input from "./ui/Input";

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

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] text-center mb-2">
          Create an Account
        </h1>

        <p className="text-sm text-[var(--color-text-secondary)] text-center mb-6">
          Fill in your details to create your account.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[var(--color-surface)] flex flex-col gap-4 border border-[var(--color-border)] shadow-lg w-full p-6 sm:p-8 rounded-2xl"
        >
          <div>
            <Input
              label="Username"
              type="text"
              placeholder="Enter your username"
              {...register("username")}
            />

            {errors.username && (
              <span className="text-[var(--color-danger)] text-xs text-left">
                {errors.username.message}
              </span>
            )}
          </div>

          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />

            {errors.email && (
              <span className="text-[var(--color-danger)] text-xs text-left">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              {...register("phoneNumber")}
            />

            {errors.phoneNumber && (
              <span className="text-[var(--color-danger)] text-xs text-left">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          <div>
            <Input label="Date of Birth" type="date" {...register("dob")} />

            {errors.dob && (
              <span className="text-[var(--color-danger)] text-xs text-left">
                {errors.dob.message}
              </span>
            )}
          </div>

          <div>
            <Input
              label="Profile Image"
              type="text"
              placeholder="Enter image URL"
              {...register("profileImage")}
            />

            {errors.profileImage && (
              <span className="text-[var(--color-danger)] text-xs text-left">
                {errors.profileImage.message}
              </span>
            )}
          </div>

          <div>
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
            >
              <button
                type="button"
                className="h-full w-11 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </Input>

            {errors.password && (
              <span className="text-[var(--color-danger)] text-xs text-left">
                {errors.password.message}
              </span>
            )}
          </div>

          <div>
            <Input
              label="Confirm Password"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword")}
            >
              <button
                type="button"
                className="h-full w-11 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <FontAwesomeIcon
                  icon={showCurrentPassword ? faEyeSlash : faEye}
                />
              </button>
            </Input>

            {errors.confirmPassword && (
              <span className="text-[var(--color-danger)] text-xs text-left">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {apiError && (
            <div className="bg-[var(--color-danger-bg)] border border-[var(--color-danger-border)] rounded-lg px-3 py-2">
              <span className="text-[var(--color-danger)] text-xs">
                {apiError}
              </span>
            </div>
          )}

          <Button variant="primary" type="submit" loading={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-sm text-[var(--color-text-secondary)] mt-5">
          Already have an account?{" "}
          <a
            href="/"
            className="text-[var(--color-secondary)] font-medium underline underline-offset-2 hover:text-[var(--color-secondary-hover)] transition"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
