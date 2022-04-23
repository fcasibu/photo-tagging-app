import React from "react";
import PropTypes from "prop-types";
import styles from "../../../styles/GameScreen.module.css";

const CharacterDrawer = ({ checkTarget, characters, foundTarget }) => {
  const displayWrong = (e) => {
    if (!foundTarget) {
      e.target.classList.add(styles.wrong);
      setTimeout(() => {
        e.target.classList.remove(styles.wrong);
      }, 400);
    }
  };

  const clickHandler = (e) => {
    checkTarget(e.target.textContent);
    displayWrong(e);
  };

  const renderCharacters = () => {
    return Object.entries(characters).map(([key, val]) => {
      return (
        <div
          key={key}
          onClick={clickHandler}
          style={val.found ? { display: "none" } : {}}
        >
          <img src={val.url} alt={key} />
          <h2>{key}</h2>
        </div>
      );
    });
  };

  return (
    <div className={styles.drawer}>{characters && renderCharacters()}</div>
  );
};

export default CharacterDrawer;

CharacterDrawer.propTypes = {
  checkTarget: PropTypes.func,
  characters: PropTypes.object,
  foundTarget: PropTypes.string,
};
