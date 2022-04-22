import React from "react";
import PropTypes from "prop-types";
import styles from "../../styles/Home.module.css";
import Card from "./Card";

const MainContent = ({ imageURL }) => {
  return (
    <div className={styles.content}>
      <h1>Choose to your liking</h1>
      <div className={styles.cards}>
        <Card name="Convention" imageURL={imageURL} />
      </div>
    </div>
  );
};

export default MainContent;

MainContent.propTypes = {
  imageURL: PropTypes.string,
};
