import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import Header from "../../components/UI/header/Header";
import { myGlobal } from "../../globalvariable";



const Home = () => {
  
  useEffect(() => {
    console.log("globalvariable = " + myGlobal.count);
    
    if(myGlobal.count === "login" || myGlobal.count === "register" || myGlobal.count === "lookup" || myGlobal.count === "technology"){
      window.location.reload(true);
    }
    myGlobal.count = "home";


  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0},
    to: { opacity: 1},
  });

  const fadePage = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });


  return (
    <>
    <Header />
    <animated.div style={fadePage} className={styles.homeBody}></animated.div>
      
        <animated.div style={fadeIn} className={styles.home}>
        <div className={styles.textWrapper}>
          <p className={styles.home__headingFive}>Blockchain Based</p>
          <h2 className={styles.home__headingTwo}>Police Ledger</h2>
          <p className={styles.home__bodyText}>
            An online Government portal for secured police and criminal records.
            Use the portal to register a complaint, check status, look up police stations 
            and officer.  
          </p>
        </div>
        <Link to="/register">
          <button className={styles.home__button}>REGISTER</button>
        </Link> </animated.div>
       
    </>
  );
};

export default Home;
