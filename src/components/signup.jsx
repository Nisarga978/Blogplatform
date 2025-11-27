import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/signup.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/backend/signup", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert(res.data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">Blog Platform</div>

        <div className="nav-buttons">
          <button className="btn" onClick={() => navigate("/")}>Home</button>
          <button className="btn" onClick={() => navigate("/login")}>Login</button>
        </div>
      </header>

      {/* Signup Form */}
      <section className="signup-section">
        <div className="form-container">
          <h2>Create Account</h2>
          <p className="subtitle">Join the community ✨</p>

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="submit-btn">Signup</button>
          </form>

          <p className="login-link">
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer", fontWeight: "600" }}
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Signup;
