import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/backend/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Signup successful! Please login.");
      navigate("/login");
    } else {
      alert(data.message || "Error signing up");
    }
  };

  return (
    <div>
      <header className="navbar">
        <div className="logo">Blog Platform</div>
        <div className="nav-buttons">
          <button className="btn" onClick={() => navigate("/")}>Home</button>
          <button className="btn" onClick={() => navigate("/login")}>Login</button>
        </div>
      </header>

      <section className="signup-section">
        <div className="form-container">
          <h2>Create Account</h2>
          <p className="subtitle">Join the community of bloggers ✨</p>

          <form onSubmit={handleSignup}>
            <input type="text" placeholder="Full Name" required value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="submit-btn">Sign Up</button>
          </form>

          <p className="login-link">
            Already have an account?{" "}
            <span className="link" onClick={() => navigate("/login")}>Login here</span>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Signup;
