import ThemeToggle from "../ui/ThemeToggle";

const Navbar = () => {
  const elements = [
    { link: "/home", name: "Home" },
    { link: "/blog", name: "MyBlogs" },
    { link: "/profile", name: "Profile" },
  ];

  return (
    <div className="h-16 bg-[var(--color-navbar-bg)] px-6 flex items-center shadow-sm sticky top-0 z-50">
      <div className="mr-auto"></div>

      <div className="flex items-center gap-8">
        {elements.map((element) => (
          <a
            key={element.link}
            href={element.link}
            className="
              text-sm
              font-medium
              text-[var(--color-navbar-text)]
              hover:text-[var(--color-navbar-text-hover)]
              hover:bg-[var(--color-navbar-hover)]
              px-3
              py-2
              rounded-lg
              transition-all
              duration-200
            "
          >
            {element.name}
          </a>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <a
          href="/"
          className="
            text-sm
            font-medium
            text-[var(--color-navbar-text)]
            hover:text-[var(--color-navbar-text-hover)]
            hover:bg-[var(--color-navbar-hover)]
            px-3
            py-2
            rounded-lg
            transition-all
            duration-200
          "
        >
          Logout
        </a>

        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
