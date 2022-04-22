import React from "react";
import styles from "../styles/Loading.module.css";

const Loading = (Component) => {
  return function checkLoad({ isLoading, image }) {
    if (!isLoading && image) {
      return <Component url={image.url} name={image.name} />;
    }

    return <h1 className={styles.loading}>Loading...</h1>;
  };
};

export default Loading;
