import { useState } from "react";

import NoProfileImage from "../assets/no-image.png";
import type { CurrentUser } from "../types/auth";
import Button from "./ui/Button";
import EditProfileForm from "./EditProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

const ProfileCard = ({
  userDetails,
  onUpdated,
}: {
  userDetails: CurrentUser;
  onUpdated?: (user: CurrentUser) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangePw, setIsChangePw] = useState(false);

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

      {/* Change Password */}
      {!isEditing && !isChangePw && (
        <div className="mt-6">
          <Button variant="secondary" onClick={handleChangePassword}>
            Change Password
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
