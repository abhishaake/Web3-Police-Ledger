import React from "react";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const history = useNavigate('/');

  return (
    <Link to="/">
      <div onClick={() => history} className={styles.logo}>
      </div>
    </Link>
  );
};

export default Logo;
