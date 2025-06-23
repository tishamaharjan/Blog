import Navbar from "./components/Navbar";
import Blog from "./pages/blog";
import Home from "./pages/home";
import { Routes, Route, useLocation } from "react-router-dom";
import Profile from "./pages/profile";
import Login from "./components/Login";
import AddBlog from "./pages/addblog";
import Register from "./components/Register";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/register" && (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
