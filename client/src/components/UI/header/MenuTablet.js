import React from "react";
import styles from "./MenuTablet.module.scss";
import { Link, useLocation } from "react-router-dom";

const MenuTablet = () => {
    const location = useLocation();

  return (
    <div className={styles.menu}>
      <Link to="/">
        <li className={location.pathname === "/" ? styles.clicked : ""}>HOME</li>
      </Link>
      <Link to="/register">
        <li className={location.pathname === "/register" ? styles.clicked : ""}>REGISTER</li>
      </Link>
      <Link to="/lookup">
        <li className={location.pathname === "/lookup" ? styles.clicked : ""}>LOOK UP</li>
      </Link>
      <Link to="/technology">
        <li className={location.pathname === "/technology" ? styles.clicked : ""}>TECHNOLOGY</li>
      </Link>
    </div>
  );
};

export default MenuTablet;
