import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.homeContainer}>
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
          {/* <Link to="/verification" className={styles.signUpBtn}>Verify</Link> */}
        </div>
      </nav>
      <div className={styles.mainContent}>
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            Master your studies with AI-powered learning
          </h1>
          <p className={styles.heroSubtitle}>
            Convert complex material into easy-to-understand formats like Overviews, or Briefing Docs
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;