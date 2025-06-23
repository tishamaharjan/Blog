import { useEffect, useState } from "react";

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
      Profile
      {userDetails.map((users, index) => (
        <div key={index}>
          <h1>Username: {users.username}</h1>
          <h1>Email: {users.email}</h1>
        </div>
      ))}
    </div>
  );
};

export default Profile;
