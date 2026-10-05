import NoProfileImage from "../assets/no-image.png";
import type { CurrentUser } from "../types/auth";

const ProfileCard = ({ userDetails }: { userDetails: CurrentUser }) => {
  return (
    <div className="border border-[var(--color-border)] p-6 m-4 rounded-2xl bg-[var(--color-surface)] shadow-md mx-auto w-full max-w-md">
      <div className="flex flex-col items-center gap-6">
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--color-border)]">
          <img
            src={userDetails.profileImage || NoProfileImage}
            alt={`${userDetails.username}'s profile`}
            className="w-full h-full object-cover"
          />
          =
        </div>

        {/* User Details */}
        <div className="flex items-center justify-between gap-8 w-full">
          <div className="flex flex-col gap-3 text-sm font-medium text-[var(--color-text-secondary)]">
            <span>Username:</span>
            <span>Email:</span>
          </div>

          <div className="flex flex-col gap-3 text-sm text-[var(--color-text-primary)] text-right">
            <span>{userDetails.username}</span>
            <span>{userDetails.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
