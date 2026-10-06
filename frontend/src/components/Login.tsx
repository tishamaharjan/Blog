import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { authApi } from "../api";
import Button from "./ui/Button";
import Input from "./ui/Input";

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
      await authApi.login({
        email: data.email,
        password: data.password,
      });

      navigate("/home");
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Invalid email or password",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] text-center mb-2">
          Login
        </h1>

        <p className="text-sm text-[var(--color-text-secondary)] text-center mb-6">
          Welcome back! Please login to your account.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[var(--color-surface)] flex flex-col gap-4 border border-[var(--color-border)] shadow-lg w-full p-6 sm:p-8 rounded-2xl"
        >
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
              })}
            />

            {errors.email && (
              <span className="text-[var(--color-danger)] text-xs text-left">
                Email is required
              </span>
            )}
          </div>

          <div>
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
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
                Password is required
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
            Login
          </Button>
        </form>

        <p className="text-center text-sm text-[var(--color-text-secondary)] mt-5">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-[var(--color-secondary)] font-medium underline underline-offset-2 hover:text-[var(--color-secondary-hover)] transition"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
