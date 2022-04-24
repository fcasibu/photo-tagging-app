import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import getPosition from "./helpers/getPosition";
import CharacterDrawer from "./helpers/CharacterDrawer";
import checkAdjacentPosition from "./helpers/checkAdjacentPosition";
import FoundCharacter from "./helpers/FoundCharacter";
import styles from "../../styles/GameScreen.module.css";
import Modal from "../Form/Modal";
import CharacterContext from "../../characters/CharacterContext";
import { digitalFormat } from "../../helper/formatTime";

const newTargets = (targets, foundTarget) => {
  const copy = JSON.parse(JSON.stringify(targets));
  copy[foundTarget].found = true;
  return copy;
};

const isAllCharactersFound = (targets) => {
  return Object.values(targets).every((el) => {
    return el.found === true;
  });
};

const GameScreen = ({ url, name, data }) => {
  const { showModal, startTime, resetTime, digitalTime } =
    useContext(CharacterContext);
  const [pos, setPos] = useState({});
  const [isFound, setIsFound] = useState(false);
  const [didClick, setDidClick] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [targets, setTargets] = useState(data);
  const [foundTarget, setFoundTarget] = useState();
  const targetRef = useRef(null);

  // useEffect(() => {
  //   setFormattedTime(digitalTime);
  // }, [digitalTime]);

  useEffect(() => {
    resetTime();
    startTime();
  }, []);

  useEffect(() => {
    if (isFound) {
      const character = <FoundCharacter pos={pos} name={foundTarget} />;
      setCharacters((state) => [...state, character]);
      setTargets(newTargets(targets, foundTarget));
      setDidClick(true);
    }
    setIsFound(false);

    showModal(isAllCharactersFound(targets));
  }, [isFound]);

  const getPos = (event) => {
    const { posX: x, posY: y } = getPosition(event);

    setPos({ x, y });
    setDidClick(!didClick);

    targetRef.current.style.setProperty("left", `${x}px`);
    targetRef.current.style.setProperty("top", `${y}px`);
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
        <div className={styles.timer}>{digitalTime}</div>
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
      <Modal />
      {renderTopContent()}
      <div className={styles["game-image"]}>
        {characters.map((el, index) => {
          return <React.Fragment key={index}>{el}</React.Fragment>;
        })}

        <div
          ref={targetRef}
          className={styles.target}
          style={!didClick ? { display: "block" } : { display: "none" }}
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
