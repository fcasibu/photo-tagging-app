import React from "react";
import styles from "../styles/Loading.module.css";

const Loading = (Component) => {
  return function checkLoad({ isLoading, imageURL }) {
    if (!isLoading) {
      return <Component imageURL={imageURL} />;
    }

    return <h1 className={styles.loading}>Loading...</h1>;
  };
};

export default Loading;
