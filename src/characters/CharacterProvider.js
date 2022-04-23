import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CharacterContext from "./CharacterContext";
import { firestore, storage } from "../firebase";

const sliceText = (str) => {
  return str.slice(0, str.lastIndexOf("."));
};

const CharacterProvider = ({ children }) => {
  const [character, setCharacter] = useState({});
  const [selectedMap, setSelectedMap] = useState("");
  const [images, setImages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getImage = async () => {
    setIsLoading(true);
    const response = await storage.ref().child("images").listAll();
    const imageLinks = response.items.map(async (imageRef) => {
      const url = await imageRef.getDownloadURL();
      const name = sliceText(imageRef.name);
      return { url, name };
    });
    return Promise.all(imageLinks);
  };

  const storeImages = async () => {
    const links = await getImage();
    links.forEach((link) => {
      setImages((state) => {
        return {
          ...state,
          [link.name]: {
            name: link.name,
            url: link.url,
          },
        };
      });
    });
  };

  useEffect(() => {
    storeImages();
    setIsLoading(false);
  }, []);

  const addCharacter = ({ name, url }) => {
    setCharacter({ name, url });
  };

  const addSelectedMap = (name) => {
    setSelectedMap(name);
  };

  const ctxValues = {
    character: {
      name: "",
      image: "",
    },
    selectedMap,
    images,
    isLoading,
    addSelectedMap,
    addCharacter,
  };

  return (
    <CharacterContext.Provider value={ctxValues}>
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterProvider;

CharacterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
