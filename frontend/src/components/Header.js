// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="main-header">
      <div className="header-logo">Mental Health Monitoring</div>

      <nav className="header-nav">
        <Link to="/" className="header-link">
          Home
        </Link>
        <Link to="/contact" className="header-link">
          Contact
        </Link>
        <Link to="/login" className="header-login-btn">
          Login
        </Link>
      </nav>
    </header>
  );
}

export default Header;
