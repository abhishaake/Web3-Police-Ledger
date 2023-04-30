import React from "react";
import Hamburger from "./Hamburger";
import MenuTablet from "./MenuTablet";
import MenuDesktop from "./MenuDesktop";
import Logo from "./Logo";
import styles from "./Header.module.scss";

const Header = (props) => {
  

  const savePageComponent = (enteredPage) => {
    props.onComponentHandler(enteredPage)
  }

  return (
    <div className={styles.header}>
      <Logo />
        <>
          {<MenuDesktop />}
        </>
    </div>
  );
};

export default Header;
