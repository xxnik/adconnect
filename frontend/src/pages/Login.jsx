import { useState, useContext } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const SKYLINE_HEIGHTS = [38, 62, 44, 80, 30, 56, 70, 42, 90, 34, 58, 48, 74, 40];

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await api.post("/auth/login", formData);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        navigate("/");
        toast.success("Login Successful");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-sky" aria-hidden="true">
        <div className="skyline">
          {SKYLINE_HEIGHTS.map((h, i) => (
            <span key={i} style={{ height: `${h}px` }} />
          ))}
        </div>
      </div>

      <div className="login-container">
        <div className="login-card">
          <span className="login-eyebrow">AdConnect · Member Access</span>
          <h1>Welcome Back</h1>
          <p>Login to your Ads Platform account</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-field">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-visibility"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="options">
              <label className="remember">
                <input type="checkbox" />
                Remember Me
              </label>

              <a href="#">Forgot Password?</a>
            </div>

            <button className="login-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="signup-text">
            Don't have an account? <Link to="/SignUp">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}