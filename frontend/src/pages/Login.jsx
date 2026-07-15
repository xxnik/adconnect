import { useState, useContext } from "react";
import "../styles/Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";



export default function Login() {
    const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    
    e.preventDefault();
  
    try {
      const response = await api.post(
        "/auth/login",
        formData,
      );
      
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user); 
        navigate("/");
        toast.success("Login SuccessFull");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Login to your Ads Platform account</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="options">
            <label className="remember">
              <input type="checkbox" />
              Remember Me
            </label>

            <a href="#">Forgot Password?</a>
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don't have an account?
          <Link to="/SignUp">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
