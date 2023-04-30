import React from "react";
import styles from "./MenuDesktop.module.scss";
import { Link, useLocation } from "react-router-dom";

const MenuDesktop = () => {
    const location = useLocation();

  return (
    <>
     hyivib  LOGOUT
      <div className={styles.line}></div>
      <div className={styles.menu}>
        <Link to="/home">
          <li className={location.pathname === "/home" ? styles.clicked : ""}>
            <span>00</span>HOME
          </li>
        </Link>
        <Link to="/register">
          <li className={location.pathname === "/register" ? styles.clicked : ""}>
            <span>01</span>REGISTER
          </li>
        </Link>
        <Link to="/lookup">
          <li className={location.pathname === "/lookup" ? styles.clicked : ""}>
            <span>02</span>LOOK UP
          </li>
        </Link>
        <Link to="/technology">
          <li className={location.pathname === "/technology" ? styles.clicked : ""}>
            <span>03</span>TECHNOLOGY
          </li>
        </Link>
      </div>
    </>
  );
};

export default MenuDesktop;
