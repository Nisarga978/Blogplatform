import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      
      <div className="navbar">
        <h2 className="logo">Blog Platform</h2>

        <div className="nav-buttons">
          <button className="nav-btn" onClick={() => navigate("/")}>Home</button>
          <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>

      
      <div className="home-content">
        <h1>Welcome to Blog Platform</h1>
        <p>Start your journey — Signup or Login to continue</p>

        <div className="home-actions">
          <button className="main-btn" onClick={() => navigate("/signup")}>Create Account</button>
          <button className="main-btn" onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>

    </div>
  );
}

export default Home;
