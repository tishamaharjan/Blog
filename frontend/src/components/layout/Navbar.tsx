const Navbar = () => {
  const elements = [
    { link: "/home", name: "Home" },
    { link: "/blog", name: "MyBlogs" },
    { link: "/profile", name: "Profile" },
  ];

  return (
    <div className="h-16 bg-[#819A91] px-6 flex items-center shadow-s sticky top-0 z-50">
      <div className="mr-auto"></div>

      <div className="flex items-center gap-8">
        {elements.map((element) => (
          <a
            href={element.link}
            className="text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
          >
            {element.name}
          </a>
        ))}
      </div>

      <a
        href="/"
        className="ml-auto text-sm font-medium text-white/75 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
      >
        Logout
      </a>
    </div>
  );
};

export default Navbar;
