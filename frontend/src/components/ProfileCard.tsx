import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import NoProfileImage from "../assets/no-image.png";
import type { CurrentUser } from "../types/auth";
import { userApi } from "../api";
import Button from "./ui/Button";
import Input from "./ui/Input";
import ImageUpload from "./ui/ImageUpload";

const schema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
});

type UpdateProfileForm = z.infer<typeof schema>;

const ProfileCard = ({
  userDetails,
  onUpdated,
}: {
  userDetails: CurrentUser;
  onUpdated?: (user: CurrentUser) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: userDetails.username,
      dob: userDetails.dob,
    },
  });

  const handleEdit = () => {
    setApiError(null);
    setImage(null);

    reset({
      username: userDetails.username,
      dob: userDetails.dob,
    });

    setIsEditing(true);
  };

  const handleCancel = () => {
    setApiError(null);
    setImage(null);

    reset({
      username: userDetails.username,
      dob: userDetails.dob,
    });

    setIsEditing(false);
  };

  const onSubmit = async (data: UpdateProfileForm) => {
    // console.log("existing user:", userDetails);
    setApiError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("username", data.username || userDetails.username);
      formData.append("dob", data.dob || userDetails.dob);

      // Only send a new image if the user selected one.
      // If no new image is selected, backend keeps the existing image.
      if (image) {
        formData.append("profileImage", image);
      }

      const response = await userApi.updateProfile(formData);

      if (response.data) {
        onUpdated?.(response.data);
      }

      setImage(null);
      setIsEditing(false);
    } catch (e) {
      setApiError(e instanceof Error ? e.message : "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-[var(--color-border)] p-6 m-4 rounded-2xl bg-[var(--color-surface)] shadow-md mx-auto w-full max-w-md">
      {/* Header */}
      <div className="flex justify-end mb-3">
        {!isEditing && (
          <Button variant="secondary" size="sm" onClick={handleEdit}>
            Edit Profile
          </Button>
        )}
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* Profile Image */}
        {!isEditing && (
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--color-border)]">
            <img
              src={userDetails.profileImage || NoProfileImage}
              alt={`${userDetails.username}'s profile`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {isEditing ? (
          /* Edit Mode */
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

            {/* Username */}
            <div>
              <Input label="Username" type="text" {...register("username")} />

              {errors.username && (
                <span className="text-[var(--color-danger)] text-xs">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* Email - Read Only */}
            <Input
              label="Email"
              type="email"
              value={userDetails.email}
              readOnly
            />

            {/* Phone Number - Read Only */}
            <Input
              label="Phone Number"
              type="tel"
              value={userDetails.phoneNumber}
              readOnly
            />

            {/* Date of Birth */}
            <div>
              <Input label="Date of Birth" type="date" {...register("dob")} />

              {errors.dob && (
                <span className="text-[var(--color-danger)] text-xs">
                  {errors.dob.message}
                </span>
              )}
            </div>

            {/* API Error */}
            {apiError && (
              <div className="bg-[var(--color-danger-bg)] border border-[var(--color-danger-border)] rounded-lg px-3 py-2">
                <span className="text-[var(--color-danger)] text-xs">
                  {apiError}
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-2">
              <Button variant="primary" type="submit" loading={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>

              <Button
                variant="secondary"
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          /* View Mode */
          <div className="flex items-center justify-between gap-8 w-full">
            <div className="flex flex-col gap-3 text-sm font-medium text-[var(--color-text-secondary)]">
              <span>Username:</span>
              <span>Email:</span>
              <span>Phone Number:</span>
              <span>Date of Birth:</span>
            </div>

            <div className="flex flex-col gap-3 text-sm text-[var(--color-text-primary)] text-right">
              <span>{userDetails.username}</span>
              <span>{userDetails.email}</span>
              <span>{userDetails.phoneNumber}</span>
              <span>{userDetails.dob}</span>
            </div>
          </div>
        )}
      </div>

      {/* Change Password */}
      {!isEditing && (
        <div className="mt-6">
          <Button variant="secondary">Change Password</Button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
