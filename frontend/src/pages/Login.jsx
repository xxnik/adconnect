import { useState } from "react";
import "../styles/Login.css";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      formData
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }

    // Later
    // axios.post("/api/auth/login", formData);
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
          <span> Sign Up</span>
        </p>

      </div>
    </div>
  );
}