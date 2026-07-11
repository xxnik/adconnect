import { useState } from "react";
import "../styles/SignUp.css";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "advertiser",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try{
        const response=await axios.post("http://localhost:3000/api/auth/signup", formData);
        console.log(response);
    }catch(error){
        console.log(error);
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

          <div className="input-group">
            <label>Register As</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="advertiser">Advertiser</option>
              <option value="owner">Billboard Owner</option>
            </select>
          </div>

          <button className="signup-btn" type="submit">
            Create Account
          </button>

        </form>

        <p className="login-text">
          Already have an account?
          <span> Login</span>
        </p>

      </div>
    </div>
  );
}