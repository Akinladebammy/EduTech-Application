import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      console.log("Request body:", JSON.stringify({ email, password }));
      const response = await fetch("https://studybuddy-1-taps.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (response.ok && data.success) {
        localStorage.setItem("access_token", data.data.access_token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/user");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.loginContainer}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          <div className={styles.robotIcon}>🤖</div>
        </Link>
        <button className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </button>
        <div className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
          <Link to="/login" className={styles.navLink}>Log In</Link>
          <Link to="/signup" className={styles.signUpBtn}>Sign Up</Link>
        </div>
      </nav>
      <div className={styles.loginForm}>
        <h2>Log in</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>👤</div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>🔒</div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <button type="submit" className={styles.loginBtn}>
            Log In
          </button>
          {/* <a href="#forgot" className={styles.forgotPassword}>
            Forgot Password?
          </a> */}
        </form>
      </div>
    </div>
  );
};

export default Login;