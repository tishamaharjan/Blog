import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";

type User = {
  username: string;
  email: string;
  password: string;
};

const Profile = () => {
  const [userDetails, setUserDetails] = useState<User[]>([]);
  useEffect(() => {
    const users = [];

    for (let i = 0; i < localStorage.length; i++) {
      const stringKey = localStorage.key(i);
      if (!stringKey?.startsWith("user_")) {
        continue;
      }
      const value = localStorage.getItem(stringKey);

      try {
        if (!value) {
          continue;
        }
        const data = JSON.parse(value);
        users.push(data);
      } catch (e) {
        console.log(e);
      }

      setUserDetails(users);
    }
  }, []);
  return (
    <div>
      {userDetails.map((user, index) => (
        <ProfileCard
          key={index}
          username={user.username}
          email={user.email}
          index={index}
        />
      ))}
    </div>
  );
};

export default Profile;
