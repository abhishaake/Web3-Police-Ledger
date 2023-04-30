import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import getWeb3 from "../../getWeb3";
import Header from "../../components/UI/header/Header";
import { myGlobal } from "../../globalvariable";
import { useNavigate } from 'react-router'



const Home = () => {
  const [show, setShow] = useState(false);
  const[contract, setContract] = useState("");
  let web3 = null;
  const[account, setAccount] = useState("");
  let loggedInAccount = "";
  const temp = async () => {
    console.log("inside");
    web3 = await getWeb3();
    console.log("pass");
    
    // loadWeb3Contract(web3);
  }
  const loadWeb3Account = async (web3) =>{
    const accounts = await web3.eth.getAccounts();
    if(accounts){
      setAccount(accounts[0]);
      loggedInAccount = accounts[0];
      

      console.log("account =  "+ accounts[0]);
    }
    return;
  }

  const connect = async () => {
    if(web3==null) console.log("still null");
    else console.log("web3 = " + web3);

    await loadWeb3Account(web3);

    console.log("account read = "+ loggedInAccount);
    if(loggedInAccount==="0x117B6314cBD99f80b6182FF846e4307427B9892e"){
      console.log("setting show = true");
      setShow(true);
    }
    
  }
  useEffect(() => {
    console.log("globalvariable = " + myGlobal.count);
    
    if(myGlobal.count === "login" || myGlobal.count === "register" || myGlobal.count === "lookup" || myGlobal.count === "technology"){
      window.location.reload(true);
    }
    myGlobal.count = "home";

    temp();

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
