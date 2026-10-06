import Navbar from "./components/layout/Navbar";
import Blog from "./pages/blog";
import Home from "./pages/home";
import { Routes, Route, useLocation } from "react-router-dom";
import Profile from "./pages/profile";
import Login from "./components/Login";
import Register from "./components/Register";
import ThemeToggle from "./components/ui/ThemeToggle";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/register" ? (
        <Navbar />
      ) : (
        <div className="fixed top-4 right-4 z-[100]">
          <ThemeToggle />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
