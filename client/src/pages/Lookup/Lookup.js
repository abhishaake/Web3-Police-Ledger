import React, { useState, useEffect } from "react";
import { useSpring, useTransition, animated } from "react-spring";
import styles from "./Destination.module.scss";
import data from "../../data.json";
import india from "../Register/destination-images/India.jpg";
import station from "../Register/destination-images/station.png";
import officer from "../Register/destination-images/officer.jpg";
import admin from "../Register/destination-images/admin.png";
import Header from "../../components/UI/header/Header";
import { myGlobal } from "../../globalvariable";
import Modal from 'react-modal';
import getWeb3 from "../../getWeb3";
import Records from "../../contracts/Records.json";
import Stations from "./Stations.json";



const Lookup = () => {
  const [planet, setPlanet] = useState(data.destinations[0]);
  const [image, setImage] = useState(india);
  const [clicked, setClicked] = useState(0);
  const [msg, setmsg] = useState("Enter Complain ID: ");
  const form = ["Enter Complain ID: ", "Enter Station ID: ", "Enter Officer ID: ", "Enter Criminal ID: "];
  const[contract, setContract] = useState("");
  const [result, setResult] = useState([]);
  const[account, setAccount] = useState("");
  const [id, setId] = useState("");
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [email, setEmail] = useState("");
  const [stationName, setStationName] = useState("");
  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
    setResult([]);
    setId("");
  }


  useEffect(() => {
    document.documentElement.style.setProperty("--planet", `url(${image})`);
  }, [image]);

  const planetPicker = (destination, planet) => {
    setPlanet(data.destinations[destination]);
    setImage(planet);
    setClicked(destination);
    setmsg(form[destination]);
  };
  
  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = Records.networks[networkId];
    if(networkData){
      const abi = Records.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
     // console.log("contract =  "+ contract);
      return contract;
    }
  }

  const loadWeb3Account = async (web3) =>{
    const accounts = await web3.eth.getAccounts();
    if(accounts){
      setAccount(accounts[0]);
      
      console.log("account =  "+ accounts[0]);
    }
  }
  const temp = async () => {
    console.log("inside");
    const web3 = await getWeb3();
    console.log("pass");
    loadWeb3Account(web3);
     loadWeb3Contract(web3);
    
  }

  useEffect(() => {
    if(myGlobal.count === "login" || myGlobal.count === "home" || myGlobal.count === "register" || myGlobal.count === "technology"){
      window.location.reload(true);
    }
    myGlobal.count = "lookup";

    console.log("date = " + Date.now());
    temp();

  }, []);

  const onChangeHandler = async (num,_id) => {
      setId(_id);
      if(_id==="") return;
      let final = [];

    if(num===0){
      // fir
      let res = await contract.methods.getFIR(_id).call();
      final.push(res);
      setResult(final);
    }

    else if(num===1){
      // station
      let res = await contract.methods.getStation(_id).call();
      final.push(res);
      setResult(final);
    }
    else if(num===2){
      // officer
      let res = await contract.methods.getOfficer(_id).call();
      final.push(res);
      setResult(final);
    }
    else if(num===3){
      // criminal
      let res = await contract.methods.getCriminal(_id).call();
      final.push(res);
      setResult(final);
    }
    
  }

  const connect2 = (clicked) => {
    if(clicked===10){
      if(stationName==="") return;
      let body1 = `
      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="fit-content" border="0">
      <thead>
      <tr>
      <th style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;">
      <strong>S. NO</strong></th>
      <th style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" >
      <strong>DISTRICT</strong></th>
      <th style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;">
      <strong>STATION</strong></th>
      <th style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;">
      <strong>CODE</strong></th>
      </tr>
      </thead>
      <tbody>`;

      let body2 = `</tbody>
      </table>
      `;

      let body = ``;
      let ser = 1;
      let len = Object.keys(Stations).length;
      for(let i =0;i<len;i++){
          if(Stations[i].DISTRICTNAME === stationName.toUpperCase()){
            //console.log("station = " + Stations[i].DISTRICTNAME);
            body = body + `
            <tr style="background-color: gray;">
            <td style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:arial,helvetica,sans-serif;">
            <div style="font-size: 14px; line-height: 100%; text-align: center; word-wrap: break-word;">
            <p style="line-height: 100%;"><strong><span style="color: white; line-height: 14px;">${ser}</span></strong></p>
            </div>
            </td>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:arial,helvetica,sans-serif;">
            <div style="font-size: 14px; line-height: 100%; text-align: center; word-wrap: break-word;">
            <p style="line-height: 100%;"><strong><span style="color: white; line-height: 14px;">${Stations[i].DISTRICTNAME}</span></strong></p>
            </div>
            </td>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:arial,helvetica,sans-serif;">
            <div style="font-size: 14px; line-height: 100%; text-align: center; word-wrap: break-word;">
            <p style="line-height: 100%;"><strong><span style="color: white; line-height: 14px;">${Stations[i].POLICESTATIONNAME}</span></strong></p>
            </div>
            </td>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:arial,helvetica,sans-serif;">
            <div style="font-size: 14px; line-height: 100%; text-align: center; word-wrap: break-word;">
            <p style="line-height: 100%;"><strong><span style="color: white; line-height: 14px;">${Stations[i].Code}</span></strong></p>
            </div>
            </td>
            </tr>
            `;
            ser= ser + 1;
          }
      }

      body = body1 + body + body2;

      const config = {
        SecureToken: "d83897d2-a739-44df-8dda-7c3cb9a4bc07",
        To: email,
        From: "recordspolice5@gmail.com",
        Subject: "Thank You for Registering",
        Body: body,
      };

      if(window.Email){
        window.Email.send(config).then(()=>afterMail());
      }
    }

    else{
      if(id==="") return;
      console.log("after res = " + result);
      openModal();
    }
    
  }
  const afterMail = () => {
    alert("Police Station List Send to your Mail !");
    setStationName("");
    setEmail("");
  }

  const transitions = useTransition(clicked, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <span>02</span>LOOK UP
        </p>

        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className={styles.modal}
            contentLabel="Example Modal"
          >
            <h2 className={styles.modal__title}>
              <span>DETAILS</span>
            
            </h2>
            <button className={styles.modal__button} onClick={closeModal}>X</button>
            
            <table className={styles.modal__table}>
              {result.map((res, key)=><tbody key={key}>
                
                {<tr > <td className={styles.modal__content}> Name </td> <td className={styles.modal__content}> {res.name} </td> </tr>}
                {(clicked===0 || clicked===1 || clicked===2) && <tr > <td className={styles.modal__content}> Email </td> <td className={styles.modal__content}> {res.email} </td> </tr>}
                {clicked===1 && <tr > <td className={styles.modal__content}> Address </td> <td className={styles.modal__content}> {res.stationaddress} </td> </tr>}
                {clicked===1 && <tr > <td className={styles.modal__content}> Pincode </td> <td className={styles.modal__content}> {res.pincode} </td> </tr>}
                {clicked===0 && <tr > <td className={styles.modal__content}> Complaint </td> <td className={styles.modal__content}> {res.complaint} </td> </tr>}
                {clicked===0 && <tr > <td className={styles.modal__content}> Date </td> <td className={styles.modal__content}> {res.date} </td> </tr>}
                {clicked===0 && <tr > <td className={styles.modal__content}> Place </td> <td className={styles.modal__content}> {res.place} </td> </tr>}
                {clicked===0 && <tr > <td className={styles.modal__content}> Suspect </td> <td className={styles.modal__content}> {res.suspect} </td> </tr>}
                {clicked===3 && <tr > <td className={styles.modal__content}> FIR ID </td> <td className={styles.modal__content}> {res.firId} </td> </tr>}
                
              </tbody>)}
            </table>

            
          </Modal>
        </div>

        <div className={styles.container}>
          <div className={styles.container__empty}></div>
          <div className={styles.description}>
            <div className={styles.description__menu}>
              <li
                className={clicked === 0 ? styles.clicked : ""}
                onClick={() => planetPicker(0, india)}
                key={1}
              >
                COMPLAINT
              </li>
              <li
                className={clicked === 1 ? styles.clicked : ""}
                onClick={() => planetPicker(1, station)}
                key={2}
              >
                POLICE STATION
              </li>
              <li
                className={clicked === 2 ? styles.clicked : ""}
                onClick={() => planetPicker(2, officer)}
                key={3}
              >
                OFFICER
              </li>
              <li
                className={clicked === 3 ? styles.clicked : ""}
                onClick={() => planetPicker(3, admin)}
                key={4}
              >
                CRIMINAL
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
                        ENTER THE DETAILS
                      </animated.p>
                    )
                )}
                {fadeIn(
                  (style, i) =>
                    clicked === i && (
                      <animated.div
                        style={style}
                        className={styles.description__smallTitle}
                      >
                        <label for="name">{msg} </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          class="form-control"
                          value={id}
                          onChange={(e)=>onChangeHandler(clicked,e.target.value)}
                        />
                        <br></br>
                        <br></br>
                        <button onClick={() => connect2(clicked)} className={styles.button1} role="button"> Get Details !</button>
                        <br></br>
                      </animated.div>
                    )
                )}
                {fadeIn(
                  (style, i) =>
                    clicked === 1 && (
                      <animated.div
                        style={style}
                        className={styles.description__smallTitle}
                      >
                        <label style={{color:"red",fontWeight:"bold"}} for="name">OR  </label>
                        <br></br>
                        <br></br>
                        <label for="name">Enter City/Town: </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          class="form-control"
                          value={stationName}
                          onChange={(e)=> setStationName(e.target.value)}
                        />
                        <br></br>
                        <br></br>
                        <label for="name">Enter you Email: </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          class="form-control"
                          value={email}
                          onChange={(e)=> setEmail(e.target.value)}
                        />
                        <br></br>
                        <br></br>
                        <button onClick={() => connect2(10)} className={styles.button1} role="button"> Get Details on Mail !</button>

                      </animated.div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </>
  );
};

export default Lookup;
