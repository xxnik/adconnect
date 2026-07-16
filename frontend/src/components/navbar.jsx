import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, setUser } = useContext(AuthContext);

  function handleLogout() {
    console.log("logout clicked");
    localStorage.removeItem("token");
    setUser(null);
    toast.success("LogOut SuccessFull");
  }

  console.log(user);
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">AdConnect</Link>
      </div>

      {/* Hamburger Button */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Nav Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        {user ? (
          <>
            <Link to="/DashBoard" onClick={() => setMenuOpen(false)}>
              Become Host
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Become Host
            </Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>

            <Link to="/signup" onClick={() => setMenuOpen(false)}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
