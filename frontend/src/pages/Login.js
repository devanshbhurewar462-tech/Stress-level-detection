import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role,
      });

      alert("Login Successful!");

      if (role === "Patient") {
        navigate("/patient-dashboard");
      } else {
        navigate("/doctor-dashboard");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          {/* ROLE */}
          <label>Login as</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
          </select>

          {/* EMAIL */}
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* BUTTON */}
          <button type="submit" className="btn-login">
            Login
          </button>

        </form>

        <p className="register-link">
          New user? <a href="/register">Register here</a>
        </p>

      </div>
    </div>
  );
}

export default Login;
