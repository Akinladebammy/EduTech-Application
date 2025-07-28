import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (!agreeTerms) {
      setError("Please agree to the terms");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://studybuddy-1-taps.onrender.com/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone: phoneNumber,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store email in localStorage for verification page
        localStorage.setItem("signupEmail", email);
        navigate("/verification");
      } else {
        setError(data.message || "An error occurred during signup");
      }
    } catch (err) {
      setError("Network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.signupContainer}>
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
      <div className={styles.signupForm}>
        <h2>Sign Up</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>👤</div>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>✉️</div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>📞</div>
            <input
              type="tel"
              placeholder="Phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>🔐</div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
            />
            <label htmlFor="agreeTerms">
              I agree to the <a href="#terms">Terms</a>
            </label>
          </div>
          <div className={styles.divider}>
            <span>or</span>
          </div>
          <div className={styles.socialLogin}>
            <button type="button" className={styles.socialBtn}>
              G
            </button>
            <button type="button" className={styles.socialBtn}>
              🍎
            </button>
            <button type="button" className={styles.socialBtn}>
              f
            </button>
            <button type="button" className={styles.socialBtn}>
              X
            </button>
          </div>
          <div className={styles.loginLink}>
            Already have an account? <Link to="/login">Login</Link>
          </div>
          <button
            type="submit"
            className={styles.signupBtn}
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;