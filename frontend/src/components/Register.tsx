import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { authApi } from "../api";
import Button from "./ui/Button";
import Input from "./ui/Input";
import type { RegisterUser } from "../types/auth";
import ImageUpload from "./ui/ImageUpload";

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
      .max(10, { message: "Invalid phone number" })
      .regex(/^\d{10}$/, { message: "Invalid phone number" }),
    dob: z.string().min(1, { message: "Date of birth is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUser>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterUser) => {
    setApiError(null);

    if (!image) {
      setApiError("Profile image is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("dob", data.dob);
      formData.append("password", data.password);
      formData.append("profileImage", image);

      const response = await authApi.register(formData);

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
            <ImageUpload variant="circle" value={image} onChange={setImage} />

            {!image && apiError === "Profile image is required." && (
              <span className="text-[var(--color-danger)] text-xs text-left">
                Profile image is required
              </span>
            )}
          </div>

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
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            ></Input>

            {errors.password && (
              <span className="text-[var(--color-danger)] text-xs text-left">
                {errors.password.message}
              </span>
            )}
          </div>

          <div>
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
            ></Input>

            {errors.confirmPassword && (
              <span className="text-[var(--color-danger)] text-xs text-left">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {apiError && apiError !== "Profile image is required." && (
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
