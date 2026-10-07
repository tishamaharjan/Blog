import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { CurrentUser } from "../types/auth";
import { userApi } from "../api";
import Button from "./ui/Button";
import Input from "./ui/Input";
import ImageUpload from "./ui/ImageUpload";
import { useToast } from "../context/ToastContext";

const schema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  dob: z.string().min(1, {
    message: "Date of birth is required",
  }),
});

type UpdateProfileForm = z.infer<typeof schema>;

type EditProfileFormProps = {
  userDetails: CurrentUser;
  onUpdated?: (user: CurrentUser) => void;
  onCancel: () => void;
};

const EditProfileForm = ({
  userDetails,
  onUpdated,
  onCancel,
}: EditProfileFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: userDetails.username,
      dob: userDetails.dob,
    },
  });

  const onSubmit = async (data: UpdateProfileForm) => {
    setApiError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("username", data.username);
      formData.append("dob", data.dob);

      if (image) {
        formData.append("profileImage", image);
      }

      const response = await userApi.updateProfile(formData);

      if (response.data) {
        onUpdated?.(response.data);
        showToast("Profile updated successfully!", "success");
      }

      setImage(null);
    } catch (e) {
      setApiError(e instanceof Error ? e.message : "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      {/* Profile Image */}
      <div>
        <ImageUpload
          variant="circle"
          value={image}
          onChange={setImage}
          existingImageUrl={userDetails.profileImage}
        />
      </div>

      <div>
        <Input label="Username" type="text" {...register("username")} />

        {errors.username && (
          <span className="text-[var(--color-danger)] text-xs">
            {errors.username.message}
          </span>
        )}
      </div>

      <Input label="Email" type="email" value={userDetails.email} readOnly />

      <Input
        label="Phone Number"
        type="tel"
        value={userDetails.phoneNumber}
        readOnly
      />

      <div>
        <Input label="Date of Birth" type="date" {...register("dob")} />

        {errors.dob && (
          <span className="text-[var(--color-danger)] text-xs">
            {errors.dob.message}
          </span>
        )}
      </div>

      {apiError && (
        <div className="bg-[var(--color-danger-bg)] border border-[var(--color-danger-border)] rounded-lg px-3 py-2">
          <span className="text-[var(--color-danger)] text-xs">{apiError}</span>
        </div>
      )}

      <div className="flex gap-3 mt-2">
        <Button variant="primary" type="submit" loading={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
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

export default EditProfileForm;
