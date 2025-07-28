import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./User.module.css";

const User = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={styles.userContainer}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          <div className={styles.robotIcon}>🤖</div>
        </Link>
        <div className={styles.navLinks}>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
          <button onClick={handleLogout} className={styles.logoutBtn}>Log Out</button>
        </div>
      </nav>
      <div className={styles.userContent}>
        <h2>Welcome, {user.fullName || "User"}!</h2>
        <div className={styles.userInfo}>
          <p><strong>Email:</strong> {user.email || "N/A"}</p>
          <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
          <p><strong>Role:</strong> {user.role || "N/A"}</p>
        </div>
        <div className={styles.actions}>
          <Link to="/dashboard" className={styles.actionBtn}>Go to Dashboard</Link>
          <Link to="/profile" className={styles.actionBtn}>Edit Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default User;