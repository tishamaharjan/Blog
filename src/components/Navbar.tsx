const Navbar = () => {
  const elements = [
    { link: "/", name: "Home" },
    { link: "/blog", name: "MyBlogs" },
    { link: "/profile", name: "Profile" },
  ];
  return (
    <div className="bg-[#819A91] h-[50px] p-3 mb-5 flex justify-center">
      <div className="mr-auto"></div>
      <div className="flex gap-10 justify-center">
        {elements.map((element) => (
          <a href={element.link} className="text-white hover:underline">
            {element.name}
          </a>
        ))}
      </div>
      <a href="/login" className="ml-auto text-white/80">
        Logout
      </a>
    </div>
  );
};

export default Navbar;
