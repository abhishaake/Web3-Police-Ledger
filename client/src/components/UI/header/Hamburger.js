import React, { useState } from "react";
import hamburgerOpen from "./icon-hamburger.svg";
import hamburgerClose from "./icon-close.svg";
import styles from "./Hamburger.module.scss";
import { Link } from "react-router-dom";

const Hamburger = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prevValue) => !prevValue);
  };

  return (
    <>
      <img
        onClick={handleClick}
        className={`${styles.hamburgerOpen} ${isClicked ? styles.hide : ""}`}
        src={hamburgerOpen}
        alt="logo"
      />
      <div
        className={`${styles.hamburgerMenu} ${isClicked ? styles.open : ""}`}
      >
        <img
          onClick={handleClick}
          className={`${styles.hamburgerClose} ${isClicked ? "" : styles.hide}`}
          src={hamburgerClose}
          alt="logo"
        />
        <ul className={styles.hamburgerMenu__list}>
          <Link to="/">
            <li>
              <span>00</span> HOME
            </li>
          </Link>
          <Link to="/destination">
            <li>
              <span>01</span> REGISTER
            </li>
          </Link>
          <Link to="/crew">
            <li>
              <span>02</span> LOOKUP
            </li>
          </Link>
          <Link to="/technology">
            <li>
              <span>03</span> TECHNOLOGY
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Hamburger;
