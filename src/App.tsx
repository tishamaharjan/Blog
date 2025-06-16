import Navbar from "./components/Navbar";
import Blog from "./pages/blog";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/profile";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
