import React, { useState, useEffect } from "react";
import { useSpring, useTransition, animated } from "react-spring";
import styles from "./Technology.module.scss";
import blocks from "./technology-images/blocks.jpg";
import Header from "../../components/UI/header/Header";
import { myGlobal } from "../../globalvariable";

import db from "./technology-images/db.jpg";
const Technology = () => {
  const isDesktop = window.matchMedia("(min-width: 1200px)").matches;

  const [image, setImage] = useState(
    isDesktop ? blocks : blocks
  );

  const infoname = ["Blockchain","Decentralised Database"];
  const infodata = ["Blockchain is a shared, immutable ledger that facilitates the process of recording transactions and tracking assets in a business network. No participant can change or tamper with a transaction after it’s been recorded to the shared ledger.","A decentralized database is basically a database without central storage or a single authority. The data is spread across multiple, distributed servers within a network instead of in a centralized data center. The data in decentralized databases are encrypted using cryptographic hash functions so that only users with the corresponding private keys can access the data."]

  const [clicked, setClicked] = useState(0);
  const [jsonNumber, setJsonNumber] = useState(0);

  const transitions = useTransition(clicked, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });

  const fadeIn = useTransition(clicked, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const fadePage = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const images = [
    {
      id: 0,
      landscape: blocks,
      portrait: blocks,
    },
    {
      id: 1,
      landscape: db,
      portrait: db,
    },
  ];

  const descriptionSetter = (image, number) => {
    setImage(image);
    setJsonNumber(number);
    setClicked(number);
  };

  useEffect(() => {
    if(myGlobal.count === "login" || myGlobal.count === "home" || myGlobal.count === "register" || myGlobal.count === "lookup"){
      window.location.reload(true);
    }
    myGlobal.count = "technology";
    

  }, []);

  return (
    <>
    <Header />
      <animated.div style={fadePage} className={styles.technologyBody}></animated.div>
      <animated.div style={fadePage}>
        <p className={styles.title}>
          <span>03</span>PORTAL TECHS
        </p>
        <div className={styles.technology}>
          {fadeIn(
            (style, i) =>
              i === clicked && (
                <animated.img
                  style={style}
                  className={styles.img}
                  src={image}
                  alt="spaceship"
                />
              )
          )}
          <div className={styles.buttonDescription}>
            <div className={styles.buttons}>
              {images.map((image) => (
                <button
                  className={
                    clicked === image.id ? styles.clicked : styles.button
                  }
                  key={image.id}
                  onClick={() =>
                    descriptionSetter(
                      isDesktop ? image.portrait : image.landscape,
                      image.id
                    )
                  }
                >
                  {image.id + 1}
                </button>
              ))}
            </div>
            {transitions(
              (style, i) =>
                i === clicked && (
                  <animated.div style={style} className={styles.information}>
                    {" "}
                    <p className={styles.terminology}>THE TERMINOLOGY...</p>
                    <h2 className={styles.descriptionTitle}>
                      {infoname[clicked]}
                    </h2>
                    <p className={styles.description}>
                      {infodata[clicked]}
                    </p>
                  </animated.div>
                )
            )}
          </div>
        </div>
      </animated.div>
    </>
  );
};

export default Technology;
