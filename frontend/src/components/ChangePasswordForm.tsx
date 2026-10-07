import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { userApi } from "../api";
import Button from "./ui/Button";
import Input from "./ui/Input";

const schema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Current password is required",
    }),

    newPassword: z.string().min(6, {
      message: "New password must be at least 6 characters",
    }),

    confirmPassword: z.string().min(1, {
      message: "Please confirm your new password",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormData = z.infer<typeof schema>;

type ChangePasswordFormProps = {
  onCancel: () => void;
};

const ChangePasswordForm = ({ onCancel }: ChangePasswordFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    setApiError(null);
    setIsSubmitting(true);

    try {
      await userApi.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      reset();
      onCancel();
    } catch (e) {
      setApiError(e instanceof Error ? e.message : "Failed to change password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      <div>
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Change Password
        </h2>

        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Enter your current password and choose a new password.
        </p>
      </div>

      <div>
        <Input
          label="Current Password"
          type="password"
          {...register("currentPassword")}
        />

        {errors.currentPassword && (
          <span className="text-[var(--color-danger)] text-xs">
            {errors.currentPassword.message}
          </span>
        )}
      </div>

      <div>
        <Input
          label="New Password"
          type="password"
          {...register("newPassword")}
        />

        {errors.newPassword && (
          <span className="text-[var(--color-danger)] text-xs">
            {errors.newPassword.message}
          </span>
        )}
      </div>

      <div>
        <Input
          label="Confirm New Password"
          type="password"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword && (
          <span className="text-[var(--color-danger)] text-xs">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {/* API Error */}
      {apiError && (
        <div className="bg-[var(--color-danger-bg)] border border-[var(--color-danger-border)] rounded-lg px-3 py-2">
          <span className="text-[var(--color-danger)] text-xs">{apiError}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-2">
        <Button variant="primary" type="submit" loading={isSubmitting}>
          {isSubmitting ? "Changing..." : "Change Password"}
        </Button>

        <Button
          variant="secondary"
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
