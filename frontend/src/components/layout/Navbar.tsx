import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import LogoutIcon from "../../assets/icons/LogoutIcon";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const elements = [
    { link: "/home", name: "Home" },
    { link: "/blog", name: "MyBlogs" },
    { link: "/profile", name: "Profile" },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `
      text-sm
      font-medium
      px-3
      py-2
      rounded-lg
      transition-all
      duration-200
      ${
        isActive
          ? "bg-[var(--color-navbar-hover)] text-[var(--color-navbar-text-hover)]"
          : "text-[var(--color-navbar-text)] hover:text-[var(--color-navbar-text-hover)] hover:bg-[var(--color-navbar-hover)]"
      }
    `;

  return (
    <div className="h-16 bg-[var(--color-navbar-bg)] px-6 flex items-center shadow-sm sticky top-0 z-50">
      <div className="mr-auto"></div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-8">
        {elements.map((element) => (
          <NavLink key={element.link} to={element.link} className={linkClass}>
            {element.name}
          </NavLink>
        ))}
      </div>

      {/* Right Section */}
      <div className="ml-auto flex items-center gap-2">
        <NavLink
          to="/"
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
            hidden sm:block
          "
        >
          <span className="flex items-center gap-2">
            Logout <LogoutIcon />
          </span>
        </NavLink>

        <ThemeToggle />

        {/* Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden p-2 rounded-lg text-[var(--color-navbar-text)] hover:bg-[var(--color-navbar-hover)]"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <span className="text-xl">✕</span>
          ) : (
            <span className="text-xl">☰</span>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[var(--color-navbar-bg)] p-4 flex flex-col gap-2 sm:hidden">
          {elements.map((element) => (
            <NavLink
              key={element.link}
              to={element.link}
              className={linkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              {element.name}
            </NavLink>
          ))}

          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className={`${linkClass} flex text-white items-center gap-2`}
          >
            Logout
            <LogoutIcon />
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
