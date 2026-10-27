import { useState } from "react";

import NoProfileImage from "../assets/no-image.png";
import type { CurrentUser } from "../types/auth";
import { userApi } from "../api";
import { useToast } from "../context/ToastContext";
import Button from "./ui/Button";
import EditProfileForm from "./EditProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

type ProfileCardProps = {
  userDetails: CurrentUser;
  onUpdated?: (user: CurrentUser) => void;
  onDeleted?: () => void;
};

const ProfileCard = ({
  userDetails,
  onUpdated,
  onDeleted,
}: ProfileCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangePw, setIsChangePw] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { showToast } = useToast();

  const handleEdit = () => {
    setIsEditing(true);
    setIsChangePw(false);
  };

  const handleChangePassword = () => {
    setIsChangePw(true);
    setIsEditing(false);
  };

  const handleProfileUpdated = (updatedUser: CurrentUser) => {
    onUpdated?.(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleCancelPassword = () => {
    setIsChangePw(false);
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? Your blogs, comments, and likes will also be permanently deleted. This action cannot be undone.",
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      await userApi.deleteAccount();

      showToast("Account deleted successfully!", "success");

      onDeleted?.();
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Failed to delete account",
        "error",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="border border-[var(--color-border)] p-6 m-4 rounded-2xl bg-[var(--color-surface)] shadow-md mx-auto w-full max-w-md">
      <div className="flex justify-end mb-3">
        {!isEditing && !isChangePw && (
          <Button variant="secondary" size="sm" onClick={handleEdit}>
            Edit Profile
          </Button>
        )}
      </div>

      <div className="flex flex-col items-center gap-6">
        {isEditing ? (
          <EditProfileForm
            userDetails={userDetails}
            onUpdated={handleProfileUpdated}
            onCancel={handleCancel}
          />
        ) : isChangePw ? (
          <ChangePasswordForm onCancel={handleCancelPassword} />
        ) : (
          <>
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--color-border)]">
              <img
                src={userDetails.profileImage || NoProfileImage}
                alt={`${userDetails.username}'s profile`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Details */}
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
          </>
        )}
      </div>

      {/* Profile Actions */}
      {!isEditing && !isChangePw && (
        <div className="flex flex-col gap-3 mt-6">
          <Button variant="secondary" onClick={handleChangePassword}>
            Change Password
          </Button>

          <Button
            variant="danger"
            onClick={handleDeleteAccount}
            loading={isDeleting}
            disabled={isDeleting}
          >
            Delete Account
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
