type Props = {
  username: string;
  email: string;
  index: number;
};

const ProfileCard = ({ username, email }: Props) => {
  return (
    <div className="border-2 p-4 m-2 rounded-2xl bg-[#e0e8cf] mx-auto w-fit">
      <div className="flex  items-center">
        <div className=" flex flex-col mr-5">
          <span>Username:</span>
          <span>Email:</span>
        </div>
        <div className="flex flex-col mr-5">
          <span>{username}</span>
          <span>{email}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
