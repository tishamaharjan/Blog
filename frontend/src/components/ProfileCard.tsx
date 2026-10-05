type Props = {
  username: string;
  email: string;
};

const ProfileCard = ({ username, email }: Props) => {
  return (
    <div className="border border-gray-200 p-6 m-4 rounded-2xl bg-white shadow-md mx-auto w-full max-w-md">
      <div className="flex items-center justify-between gap-8">
        <div className="flex flex-col gap-3 text-sm font-medium text-gray-500">
          <span>Username:</span>
          <span>Email:</span>
        </div>

        <div className="flex flex-col gap-3 text-sm text-gray-800 text-right">
          <span>{username}</span>
          <span>{email}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
