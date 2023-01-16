import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import "./Home.css";

function FrontPage() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="home-page">
      <div className="header">
        <h1 className="title">Welcome to Our Doctor's Office</h1>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/services" className="nav-link">
          Services
        </Link>
        <Link to="/about" className="nav-link">
          About Us
        </Link>
        <Link to="/contact" className="nav-link">
          Contact Us
        </Link>
      </div>
      <div className="content">
        {user ? (
          <div className="logged-in-message">
            Hi, {user.name}. Welcome back!
          </div>
        ) : (
          <div className="logged-out-message">
            Please <Link to="/login">log in</Link> or{" "}
            <Link to="/register">register</Link> to access your account.
          </div>
        )}
      </div>
    </div>
  );
}

export default FrontPage;
