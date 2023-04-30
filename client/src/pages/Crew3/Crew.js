import React, { useState, useMemo, useEffect } from "react";
import { useSpring, useTransition, animated } from 'react-spring';
import styles from "./Crew.module.scss";
import douglasImg from "./crew-images/image-douglas-hurley.png";
import data from "../../data.json";
import markImg from "./crew-images/image-mark-shuttleworth.png";
import victorImg from "./crew-images/image-victor-glover.png";
import anoushehImg from "./crew-images/image-anousheh-ansari.png";
import bg from "./crew-images/bg.jpg";
const Crew = () => {
    const members = useMemo(() => [
        { id: 0, img: douglasImg },
        { id: 1, img: markImg },
        { id: 2, img: victorImg },
        { id: 3, img: anoushehImg },
    ], []);

  const [member, setMember] = useState(douglasImg);
  const [jsonNumber, setJsonNumber] = useState(0);
  const [clicked, setClicked] = useState(0);

  const transitions = useTransition(clicked, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  const fadeIn = useTransition(clicked, {
    from: { opacity: 0},
    enter: { opacity: 1},
    leave: { opacity: 0},
  })

  const fadePage = useSpring({
    from: { opacity: 0},
    to: { opacity: 1},
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setClicked(clicked => (clicked + 1) % 4);
      setJsonNumber(clicked => (clicked + 1) % 4);
    }, 5000);
    setMember(members[clicked].img)
    return () => clearInterval(interval);
  }, [clicked, members]);

  const memberSetter = (member, number) => {
    setMember(member);
    setJsonNumber(number);
    setClicked(number);
  };

  return (
    <>
    <animated.div style={fadePage} className={styles.crewBody}></animated.div>
    <animated.div style={fadePage}>
      <p className={styles.title}>
        <span>02</span>LOOK UP
      </p>
      <div className={styles.crew}>
        <div className={styles.imageContainer}>
        {fadeIn((style, i) =>
            i === clicked &&
            <animated.img style={style} className={styles.image} src={member} alt="member" />
          )}
        </div>
        <div className={styles.buttonDescriptionWrapper}>
          <div className={styles.buttons}>
            {members.map((member) => (
              <button
                className={
                  clicked === member.id ? styles.clicked : styles.button
                }
                key={member.id}
                onClick={() => memberSetter(member.img, member.id)}
              ></button>
            ))}
          </div>
          {transitions((style, i) =>
            i === clicked &&
            <animated.div style={style} className={styles.description}><p className={styles.role}>{data.crew[jsonNumber].role}</p>
            <p className={styles.name}>{data.crew[jsonNumber].name}</p>
            <p className={styles.bio}>{data.crew[jsonNumber].bio}</p></animated.div>
          )}
        </div>
      </div>
    </animated.div>
    </>
  );
};

export default Crew;
