import React, { useState, useEffect } from "react";
import Hamburger from "./UI/header/Hamburger";
import Logo from "./UI/header/Logo";
import styles from "./Login.module.scss";
import getWeb3 from "../getWeb3";
import Auction from "../contracts/Auction.json";
import { Link, useLocation } from "react-router-dom";
import { myGlobal } from "../globalvariable";

import MenuDesktop from "./UI/header/MenuDesktop";

const Login = (props) => {
  
  const[contract, setContract] = useState("");
  let mycontract = "";
  let myaccount = "";
  const[account, setAccount] = useState("");
  let loggedInAccount = "";
  let x ="1234";

  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = Auction.networks[networkId];
    if(networkData){
      const abi = Auction.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      mycontract = contract;
     // console.log("contract =  "+ contract);
      return contract;
    }
    return "";
  }

  const loadWeb3Account = async (web3) =>{
    const accounts = await web3.eth.getAccounts();
    if(accounts){
      setAccount(accounts[0]);
      myaccount = accounts[0];
      loggedInAccount = accounts[0];
      //console.log("account =  "+ accounts[0]);
      return accounts[0];
    }
    return "";
  }

  const temp = async () => {
    const web3 = await getWeb3();
    if(web3===null) console.log("did not work");
    else console.log(web3);

    loadWeb3Account(web3);
    loadWeb3Contract(web3);
      
  }


  const [show, setShow] = useState(false);
  const [showId , setShowId] = useState(false);
  useEffect(() => {
    if(myGlobal.count === "home" || myGlobal.count === "register" || myGlobal.count === "technology" || myGlobal.count === "lookup"){
      window.location.reload(true);
    }
    myGlobal.count = "login";
    temp();
    setTimeout(() => {
        console.log('for displaying after 10 sec');
        console.log("myaccount = " + myaccount);
        setAccount(myaccount);
        if(myaccount!=="") setShowId(true);
    }, 1500);
    

  }, []);

  const savePageComponent = (enteredPage) => {
    props.onComponentHandler(enteredPage)
  }

  return (
    <>
    <div className={styles.header}>
        <Logo />
        <div className={styles.title}>BLOCKCHAIN BASED POLICE LEDGER</div> 
        <div className={styles.welcome}> WELCOME </div>
    </div>
    <div className={styles.body}>
        
    <form className={styles.box}>
        <input placeholder="Enter Your Name" className={styles.box__input}></input>
        
        <button className={styles.box__button}>
            <Link to="/home">
                LOGIN
            </Link>
        </button>
    </form>
    {showId ? <><div className={styles.box__heading}> LOGIN ADDRESS: <div className={styles.box__heading__address}>{account}</div></div></> : <></>}
    </div>
    </>
  );
};

export default Login;
