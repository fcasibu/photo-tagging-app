import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/Home.module.css";
import Card from "./Card";
import CharacterContext from "../../characters/CharacterContext";

const MainContent = () => {
  const { images, stopTime } = useContext(CharacterContext);

  useEffect(() => {
    stopTime();
  }, []);

  const renderImages = () => {
    return Object.entries(images).map(([key, val]) => {
      return (
        <div key={key}>
          <Card name={key} url={val.url} />
        </div>
      );
    });
  };

  return (
    <div className={styles.content}>
      <h1>Choose to your liking</h1>
      <div className={styles.cards}>{renderImages()}</div>
    </div>
  );
};

export default MainContent;

MainContent.propTypes = {
  images: PropTypes.object,
};
