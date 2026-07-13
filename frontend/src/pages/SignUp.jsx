import { useState } from "react";
import "../styles/SignUp.css";
import axios from "axios";

import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Signup() {

const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData,
      );
      if(response.data.success){
        navigate("/login");
        toast.success("Account created successsfully");
      }
      
      // toast.success("Signup successful!");
      
    } catch (error) {
      console.log(error.response?.data || error.messag);
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Create Account</h1>
        <p>Join AdsPlatform today</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button className="signup-btn" type="submit">
            Create Account
          </button>
        </form>

        <p className="login-text">
          Already have an account?
          <Link to="/Login">Login</Link>
        </p>
      </div>
    </div>
  );
}
