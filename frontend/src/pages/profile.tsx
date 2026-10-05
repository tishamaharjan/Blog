import { useEffect, useState } from "react";
import ProfileCard from "../components/ui/ProfileCard";
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
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userDetails) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <ProfileCard username={userDetails.username} email={userDetails.email} />
    </div>
  );
};

export default Profile;
