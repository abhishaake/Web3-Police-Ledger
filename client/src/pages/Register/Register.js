import React, { useState, useEffect } from "react";
import { useSpring, useTransition, animated } from "react-spring";
import styles from "./Destination.module.scss";
import data from "../../data.json";
import india from "./destination-images/India.jpg";
import station from "./destination-images/station.png";
import officer from "./destination-images/officer.jpg";
import admin from "./destination-images/admin.png";
import getWeb3 from "../../getWeb3";
import Records from "../../contracts/Records.json";
import Header from "../../components/UI/header/Header";
import { myGlobal } from "../../globalvariable";
import {emailBody} from "./emailbody.js";
import emailImage from "./image-1.png";

const Register = () => {

  const [form, setForm] = useState({"name":"", "phone":"", "email":"", "adhar":"","complaint":"","suspect":"","date":"","place":"","stationID":"","address":"","pincode":"","officerID":"","adminID":""});
  const [planet, setPlanet] = useState(data.destinations[0]);
  const [image, setImage] = useState(india);
  const [clicked, setClicked] = useState(0);
  const adminAccount = "0x117B6314cBD99f80b6182FF846e4307427B9892e";
  const[contract, setContract] = useState("");
  let mycontract = "";
  let myaccount = "";
  let uniqueId = "";
  const[account, setAccount] = useState("");
  let loggedInAccount = "";

  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = Records.networks[networkId];
    if(networkData){
      const abi = Records.abi;
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
      //console.log("account =  "+ myaccount);
      if(myaccount!==adminAccount){
        setShow(false);
      }
      return accounts[0];
    }
    return "";
  }
  
  const temp = async () => {
    const web3 = await getWeb3();

    loadWeb3Account(web3);
    loadWeb3Contract(web3);
      
  }


  const [show, setShow] = useState(true);
  

  const register = async (num) => {
    if(num===0){
      // for FIR Registration
      if(form.name==="" || form.phone==="" || form.email==="" || form.adhar==="" || form.complaint==="" || form.suspect==="" || form.date==="" || form.place===""){
        alert("Form Invalid ! Please fill the complete Form.");
        return;
      }

      uniqueId = Date.now();

      contract.methods.addFIR(uniqueId,form.name,form.phone,form.email,form.adhar,form.complaint,form.suspect,form.date,form.place).send({from: account}, (error)=>{
        if(!error){
            sendEmail();
        }
      });

    }
    

    else if(num===1){
      // for station registration
      if(form.name==="" || form.phone==="" || form.email==="" || form.stationID==="" || form.address==="" || form.pincode===""){
        alert("Form Invalid ! Please fill the complete Form.");
        return;
      }
      contract.methods.addStation(form.name,form.email,form.phone,form.stationID,form.address,form.pincode).send({from: account}, (error)=>{
        if(!error){
            afterMail(2);
        }
      });
    }

    else if(num===2){
      // for officer registration
      if(form.name==="" || form.phone==="" || form.email==="" || form.adhar==="" || form.officerID===""){
        alert("Form Invalid ! Please fill the complete Form.");
        return;
      }
      contract.methods.addOfficer(form.name,form.email,form.phone,form.adhar,form.officerID,form.officerID).send({from: account}, (error)=>{
        if(!error){
            afterMail(2);
        }
      });
    }

    else if(num===3){
      // for admin registration
      if(form.name==="" || form.phone==="" || form.email==="" || form.adhar==="" || form.adminID===""){
        alert("Form Invalid ! Please fill the complete Form.");
        return;
      }
      contract.methods.addAdmin(form.name,form.email,form.phone,form.adhar,form.adminID).send({from: account}, (error)=>{
        if(!error){
            afterMail(2);
        }
      });
    }
  }

  const sendEmail = () => {
    //event.preventDefault();
    let bodyContent = `<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 0px;font-family:arial,helvetica,sans-serif;" align="left">
          
    <h1 style="margin: 0px; color: #492e90; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 22px; font-weight: 400;"><strong>FIR DETAILS</strong></h1>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" >
     <div style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
        <p style="line-height: 140%;"><strong>FIR ID: <span style="color: #2dc26b; line-height: 19.6px;">${uniqueId}</span></strong></p>
      </div>      
    <div style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
      <p style="line-height: 140%;"><strong>Name: <span style="color: #2dc26b; line-height: 19.6px;">${form.name}</span></strong></p>
    </div>
    <div style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
      <p style="line-height: 140%;"><strong>Phone No: <span style="color: #2dc26b; line-height: 19.6px;">${form.phone} </span></strong></p>
    </div>
    <div style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
      <p style="line-height: 140%;"><strong>Email: <span style="color: #2dc26b; line-height: 19.6px;">${form.email} </span></strong></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          
    <div style="font-size: 16px; line-height: 140%; text-align: center; word-wrap: break-word;">
  <p style="line-height: 140%;"> </p>
  <p style="line-height: 140%;"><span style="font-weight:bold">Complaint :</span> ${form.complaint}</p>
  <p style="line-height: 140%;"><span style="font-weight:bold">Suspect INFO :</span> ${form.suspect}</p>
  <p style="line-height: 140%;"><span style="font-weight:bold">Date :</span> ${form.date}</p>
  <p style="line-height: 140%;"><span style="font-weight:bold">Place :</span>${form.place}</p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>`; 

  let body = emailBody.body + bodyContent + emailBody.body2;
    const config = {
        SecureToken: "d83897d2-a739-44df-8dda-7c3cb9a4bc07",
        To: form.email,
        From: "recordspolice5@gmail.com",
        Subject: "Thank You for Registering",
        Body: body,
    };

    if(window.Email){
      window.Email.send(config).then(()=>afterMail(1));
    }

  };
  
  const afterMail = (num) => {
    if(num===1){
      alert("Successfully Registered ! Details sent to your mail." );
    }
    else alert("Successfully Registered !");
    
    setForm(form => ({...form, "name":"", "phone":"", "email":"", "adhar":"","complaint":"","suspect":"","date":"","place":"","stationID":"","address":"","pincode":"","officerID":"","adminID":""}));
  }


  

  useEffect( () => {
    temp();
    document.documentElement.style.setProperty("--planet", `url(${image})`);
    //console.log("global variable = " + globalvariable.value);

    if(myGlobal.count === "login" || myGlobal.count === "home" || myGlobal.count === "lookup" || myGlobal.count === "technology"){
      window.location.reload(true);
    }
    myGlobal.count = "register";

  }, [image]);

  const planetPicker = (destination, planet) => {
    setPlanet(data.destinations[destination]);
    setImage(planet);
    setClicked(destination);

    if(account!==adminAccount){
      setShow(false);
    }
    else setShow(true);
  };

  const [rows, setRows] = useState(1);
  const [rows2, setRows2] = useState(1);

  const handleChange = (event,num) => {
		const textareaLineHeight = 24;
    const minRows= 1;
    const maxRows = 7;
		
		const previousRows = event.target.rows;
  	event.target.rows = minRows; // reset number of rows in textarea 
		
		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    
    if (currentRows === previousRows) {
    	event.target.rows = currentRows;
    }
		
		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}
    
    if(num===1) setRows(currentRows < maxRows ? currentRows : maxRows);
    else setRows2(currentRows < maxRows ? currentRows : maxRows);
	};


  const transitions = useTransition(clicked, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });

  const scale = useTransition(clicked, {
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(-1)" },
  });

  const fadeIn = useTransition(clicked, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
  });

  const fadePage = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <>
    <Header />
      <animated.div
        style={fadePage}
        className={styles.destinationBody}
      ></animated.div>
      <animated.div className={styles.destination} style={fadePage}>
        <p className={styles.destination__title}>
          <span>01</span>REGISTER
        </p>
        <div className={styles.container}>
          {scale(
            (style, i) =>
              i === clicked && (
                <animated.div
                  style={style}
                  className={styles.planet}
                ></animated.div>
              )
          )}
          <div className={styles.description}>
            <div className={styles.description__menu}>

              <li
                className={clicked === 0 ? styles.clicked : ""}
                onClick={() => planetPicker(0, india)}
                key={1}
              >
                FILE A COMPLAINT
              </li>
              { show && <li
                className={clicked === 1 ? styles.clicked : ""}
                onClick={() => planetPicker(1, station)}
                key={2}
              >
                REGISTER A POLICE STATION
              </li> } 
              { show && <li
                className={clicked === 2 ? styles.clicked : ""}
                onClick={() => planetPicker(2, officer)}
                key={3}
              >
                REGISTER AS OFFICER
              </li> }
              <li
                className={clicked === 3 ? styles.clicked : ""}
                onClick={() => planetPicker(3, admin)}
                key={4}
              >
                REGISTER AS ADMIN
              </li>
            </div>

           

             <div className={styles.description__wrapper}>
             <div className={styles.distance}>
                {fadeIn(
                  (style, i) =>
                    i === clicked && (
                      <animated.p
                        style={style}
                        className={styles.description__menu}
                      >
                        FORM
                      </animated.p>
                    )
                )}
                {fadeIn(
                  (style, i) =>
                    i === clicked && (
                      <div
                        style={style}
                        className={styles.description__smallTitle}
                      >
                        <image style={{width:100 + '%'}} src={emailImage}></image>
                        <label for="name">NAME: </label>
                        <input
                          style={{marginLeft:40 + 'px'}}
                          value={form.name}
                          onChange={(e)=> setForm(form => ({...form, "name":e.target.value}))}
                          type="text"
                          id="name"
                          name="name"
                          class="form-control"
                        />

                        <label className={styles.description__label} for="name">EMAIL ID: </label>
                        <input
                          style={{marginLeft:20 + 'px'}}
                          value={form.email}
                          onChange={(e)=> setForm(form => ({...form, "email":e.target.value}))}
                          type="text"
                          id="name"
                          name="name"
                          class="form-control"
                        />
                      </div>
                      
                    )
                )}

                {fadeIn(
                  (style, i) =>
                    i === clicked && (
                      <div
                        style={style}
                        className={styles.description__smallTitle}
                      >
                        <label for="name">PHONE NO: </label>
                        <input
                          style={{marginLeft:2 + 'px'}}  
                          value={form.phone}
                          onChange={(e)=> setForm(form => ({...form, "phone":e.target.value}))}
                          type="text"
                          id="name"
                          name="name"
                          class="form-control"
                        />

                        {(clicked === 0 || clicked === 2 || clicked === 3) && <>
                          <label className={styles.description__label} for="name">ADHAAR ID: </label>
                          <input
                            value={form.adhar}
                            onChange={(e)=> setForm(form => ({...form, "adhar":e.target.value}))}
                            type="text"
                            id="name"
                            name="name"
                            class="form-control"
                          />
                        </>}

                          { clicked === 1 && <>
                            <label className={styles.description__label} for="stationID">STATION ID: </label>
                            <input
                              value={form.stationID}
                              onChange={(e)=> setForm(form => ({...form, "stationID":e.target.value}))}
                              type="text"
                              id="name"
                              name="name"
                              class="form-control"
                            />
                            </>
                          }
                      </div>
                    )
                )}

                {fadeIn(
                  (style, i) =>
                    (clicked === 2 ) && (
                      <div
                        style={style}
                        className={styles.description__smallTitle}
                      >
                        <label for="name">OFFICER ID: </label>
                        <input
                          value={form.officerID}
                          onChange={(e)=> setForm(form => ({...form, "officerID":e.target.value}))}
                          type="text"
                          id="name"
                          name="name"
                          class="form-control"
                        />
                      </div>
                    )
                )}    

                {fadeIn(
                  (style, i) =>
                    (clicked === 1 ) && (
                      <div
                        style={style}
                        className={styles.description__smallTitle}
                      >
                        <label for="name">ADDRESS: </label>
                        <textarea
                          value={form.address}
                          rows={rows}
                          className={styles.description__inputbox}
                          onChange={(e)=> {handleChange(e,3); setForm(form => ({...form, "address":e.target.value}))}}
                        />
                      </div>
                    )
                )}  

                {fadeIn(
                  (style, i) =>
                    (clicked === 1 ) && (
                      <div
                        style={style}
                        className={styles.description__smallTitle}
                      >
                        <label for="name">PINCODE: </label>
                        <input
                          value={form.pincode}
                          onChange={(e)=> setForm(form => ({...form, "pincode":e.target.value}))}
                          style={{marginLeft:12 + 'px'}}
                          type="text"
                          id="name"
                          name="name"
                          class="form-control"
                        />
                      </div>
                    )
                )}    


                {fadeIn(
                  (style, i) =>
                    (clicked === 3 ) && (
                      <div
                        style={style}
                        className={styles.description__smallTitle}
                      >
                        <label for="name">ADMIN ID: </label>
                        <input
                          value={form.adminID}
                          onChange={(e)=> setForm(form => ({...form, "adminID":e.target.value}))}
                          type="text"
                          id="name"
                          name="name"
                          class="form-control"
                        />
                      </div>
                    )
                )}

                {fadeIn(
                  (style, i) =>
                    clicked === 0 && (
                      <div
                        style={style}
                        className={styles.description__smallTitle}
                      >
                        <label for="name">COMPLAINT DESCRIPTION: </label>
                        <textarea
                          rows={rows}
                          className={styles.description__inputbox}
                          onChange={(e)=> {handleChange(e,1); setForm(form => ({...form, "complaint":e.target.value}))}}
                          value={form.complaint}
                        />

                      </div>
                    )
                )}
                {fadeIn(
                  (style, i) =>
                    clicked === 0 && (
                      <div
                        style={style}
                        className={styles.description__smallTitle}
                      >
                        <label for="name">SUSPECT DESCRIPTION: </label>
                        <textarea
                        style={{marginLeft:25 + 'px'}}
                        value={form.suspect}
                          className={styles.description__inputbox}
                          onChange={(e)=> {handleChange(e,2); setForm(form => ({...form, "suspect":e.target.value}))}}
                          rows={rows2}
                        />

                      </div>
                    )
                )}
                {fadeIn(
                  (style, i) =>
                    clicked === 0 && (
                      <div
                        style={style}
                        className={styles.description__smallTitle}
                      >
                        
                        <label for="name">CRIME DATE: </label>
                        <input
                          value={form.date}
                          onChange={(e)=> setForm(form => ({...form, "date":e.target.value}))}
                          type="date"
                          id="name"
                          name="name"
                          class="form-control"
                        />

                        < label className={styles.description__label} for="name">CRIME PLACE: </label>
                        <input
                          value={form.place}
                          onChange={(e)=> setForm(form => ({...form, "place":e.target.value}))}
                          type="text"
                          id="name"
                          name="name"
                          class="form-control"
                        />
                      </div>
                    )
                )}
                {fadeIn(
                  (style, i) =>
                      <div
                        style={style}
                        className={styles.description__smallTitle}
                      >
                        
                        <button onClick={() => register(clicked)} className={styles.button1} role="button">Register !</button>
                      </div>
                    
                )}
              </div>
              
            </div> 
          </div>
        </div>
      </animated.div>
    </>
  );
};

export default Register;
