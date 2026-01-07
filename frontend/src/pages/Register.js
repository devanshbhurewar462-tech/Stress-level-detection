 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Patient");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [bloodGroup, setBloodGroup] = useState("B+ / O-");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        fullName,
        email,
        password,
        role,
        age,
        gender,
        bloodGroup
      });

      
      
      alert("Registration successful! Please verify your email.");
navigate("/login");


    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">

        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Register as</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
          </select>

          <label>Age</label>
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label>Blood Group</label>
          <input
            type="text"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          />

          <button type="submit" className="btn-register">
            Register
          </button>

        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>

      </div>
    </div>
  );
}

export default Register;
