import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { userApi, ApiError } from "../api";
import type { CurrentUser } from "../types/auth";

const Profile = () => {
  const [userDetails, setUserDetails] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        // The httpOnly cookie is the only auth state; the server resolves identity.
        const { data } = await userApi.getMe();
        setUserDetails(data);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          setError("Please log in to view your profile");
          return;
        }
        setError("Failed to load user details");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-text-secondary)]">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-danger)]">
        {error}
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-text-secondary)]">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-start justify-center px-4 py-10">
      <ProfileCard userDetails={userDetails} onUpdated={setUserDetails} />
    </div>
  );
};

export default Profile;
