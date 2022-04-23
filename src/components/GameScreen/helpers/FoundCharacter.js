import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../../../styles/GameScreen.module.css";

const FoundCharacter = ({ pos: { x, y }, name }) => {
  const characterRef = useRef();

  useEffect(() => {
    characterRef.current.style.left = `${x}px`;
    characterRef.current.style.top = `${y - 10}px`;
  }, []);

  return (
    <React.Fragment>
      <div className={styles.found} ref={characterRef}>
        You Found {name}!
      </div>
    </React.Fragment>
  );
};

export default FoundCharacter;

FoundCharacter.propTypes = {
  pos: PropTypes.objectOf(PropTypes.number),
  name: PropTypes.string,
};
