import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Loading.module.css";
import CharacterContext from "../characters/CharacterContext";
import { firestore } from "../firebase";

const Loading = (Component) => {
  return function checkLoad() {
    const { images, selectedMap, backup } = useContext(CharacterContext);
    const [characters, setCharacters] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        const res = firestore.collection(selectedMap || backup);
        const data = await res.get();

        data.docs.forEach((item) => {
          setCharacters(item.data());
        });
        setIsLoading(false);
      };

      fetchData();
    }, []);

    if (!isLoading && images[selectedMap || backup]) {
      return (
        <Component
          url={images[selectedMap || backup].url}
          name={images[selectedMap || backup].name}
          data={characters}
        />
      );
    }
    return <h1 className={styles.loading}>Loading...</h1>;
  };
};

export default Loading;
