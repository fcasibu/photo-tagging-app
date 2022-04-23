import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CharacterContext from "./CharacterContext";
import { storage } from "../firebase";

const sliceText = (str) => {
  return str.slice(0, str.lastIndexOf("."));
};

const CharacterProvider = ({ children }) => {
  const [selectedMap, setSelectedMap] = useState("");
  const [images, setImages] = useState({});

  const getImage = async () => {
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
  }, []);

  const addSelectedMap = (name) => {
    setSelectedMap(name);
  };

  const ctxValues = {
    selectedMap,
    images,
    addSelectedMap,
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
