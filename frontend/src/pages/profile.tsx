import { useEffect, useState } from "react";
import ProfileCard from "../components/ui/ProfileCard";

type User = {
  username: string;
  email: string;
  password: string;
};

const Profile = () => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          setError("User ID not found");
          return;
        }

        const response = await fetch(
          `http://localhost:3000/api/users/${userId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const result = await response.json();

        setUserDetails(result.data);
      } catch (error) {
        console.error(error);
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
