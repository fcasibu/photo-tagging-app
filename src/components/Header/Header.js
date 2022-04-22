import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <h2>Photo Tagging App</h2>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
