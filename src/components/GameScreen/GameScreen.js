import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import getPosition from "./helpers/getPosition";
import CharacterDrawer from "./helpers/CharacterDrawer";
import checkAdjacentPosition from "./helpers/checkAdjacentPosition";
import FoundCharacter from "./helpers/FoundCharacter";
import styles from "../../styles/GameScreen.module.css";

const newTargets = (targets, foundTarget) => {
  const copy = JSON.parse(JSON.stringify(targets));
  copy[foundTarget].found = true;
  return copy;
};

const GameScreen = ({ url, name, data }) => {
  const [pos, setPos] = useState({});
  const [isFound, setIsFound] = useState(false);
  const [didClick, setDidClick] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [targets, setTargets] = useState(data);
  const [foundTarget, setFoundTarget] = useState();
  const targetRef = useRef();

  useEffect(() => {
    if (isFound) {
      const character = <FoundCharacter pos={pos} name={foundTarget} />;
      setCharacters((state) => [...state, character]);
      setTargets(newTargets(targets, foundTarget));
    }

    setIsFound(false);
  }, [isFound]);

  const getPos = (event) => {
    const { posX: x, posY: y } = getPosition(event);
    setPos({ x, y });
    targetRef.current.style.setProperty("left", `${x}px`);
    targetRef.current.style.setProperty("top", `${y}px`);
    setDidClick(!didClick);
  };

  const checkTarget = (targetName) => {
    const isAdjacent = checkAdjacentPosition(pos, targets[targetName]);

    if (isAdjacent) {
      setIsFound(isAdjacent);
      setFoundTarget(targetName);
    }
  };

  const renderTopContent = () => {
    return (
      <div className={styles["top-content"]}>
        <h1 className={styles["game-title"]}>{name}</h1>
        <div className={styles.characters}>
          {Object.entries(targets).map(([key, val]) => {
            return (
              <div key={key} style={val.found ? { opacity: "0.3" } : {}}>
                <img src={val.url} alt={key} />
                <h2>{key}</h2>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {renderTopContent()}
      <div className={styles["game-image"]}>
        {characters.map((el, index) => {
          return <React.Fragment key={index}>{el}</React.Fragment>;
        })}

        <div
          ref={targetRef}
          className={styles.target}
          style={didClick ? { display: "block" } : { display: "none" }}
        >
          <CharacterDrawer
            checkTarget={checkTarget}
            fountTarget={foundTarget}
            characters={targets}
            name={foundTarget}
          />
          <span className={styles.marker}></span>
        </div>
        <img src={url} alt={name} onClick={getPos} />
      </div>
    </React.Fragment>
  );
};

export default GameScreen;

GameScreen.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.object,
};
