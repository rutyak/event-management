import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useAuthAndData } from "../../context/AuthAndDataContext"; 
import axios from "axios";
const Base_url = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuthAndData(); 

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); 
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${Base_url}/login`, { email, password });

      if (response && response.data) {
        toast.success("Login successfully !!");
        const { token } = response.data;

        localStorage.setItem("token", token);
        login();
        navigate("/dashboard");
      } else {
        setError("Invalid response from the server.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
      console.error("Error:", err);
    }
  };

  return (
    <div className="register-card">
      <h2>Welcome to Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="toggle-visibility">&#x1F441;</span>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="register-btn" type="submit">
          Login
        </button>
      </form>
      <p className="login-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
