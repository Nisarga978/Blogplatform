import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:5000/backend/login", {
        email,
        password,
      });
      console.log("LOGIN RESPONSE:", res.data);

      if (res.data.success) {
         localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Login successful!");
        navigate("/dashboard");
        console.log("logedin" );
        
      } else {
        alert(res.data.message || "Invalid login");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div>
      
      <header className="navbar">
        <div className="logo">Blog Platform</div>

        <div className="nav-buttons">
          <button className="btn" onClick={() => navigate("/")}>Home</button>
          <button className="btn" onClick={() => navigate("/signup")}>Signup</button>
        </div>
      </header>

      
      <section className="login-section">
        <div className="form-container">
          <h2>Login</h2>
          <p className="subtitle">Welcome back 👋</p>

          <form onSubmit={handleLogin}>
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

            <button type="submit" className="submit-btn">Login</button>
          </form>

          <p className="signup-link">
            Don’t have an account?{" "}
            <span className="link" onClick={() => navigate("/signup")}>
              Signup here
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
