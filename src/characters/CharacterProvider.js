import React, { useState, useEffect, useRef } from "react";
import { formatDuration, intervalToDuration } from "date-fns";
import PropTypes from "prop-types";
import CharacterContext from "./CharacterContext";
import { storage } from "../firebase";

const sliceText = (str) => {
  return str.slice(0, str.lastIndexOf("."));
};

const formattedTime = (time) => {
  return formatDuration(intervalToDuration({ start: 0, end: time * 1000 }));
};

const CharacterProvider = ({ children }) => {
  const [timer, setTimer] = useState(0);
  const [endTime, setEndTime] = useState("");
  const [selectedMap, setSelectedMap] = useState("");
  const [images, setImages] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef();

  const getImage = async () => {
    const response = await storage.ref().child("images").listAll();
    const imageLinks = response.items.map(async (imageRef) => {
      const url = await imageRef.getDownloadURL();
      const name = sliceText(imageRef.name);
      return { url, name };
    });
    return Promise.all(imageLinks);
  };

  useEffect(() => {
    console.log(timer);
  }, [timer]);

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

  const increaseInterval = () => {
    setTimer((state) => state + 1);
  };

  const startTime = () => {
    intervalRef.current = setInterval(increaseInterval, 1000);
  };

  const resetTime = () => {
    setTimer(0);
  };

  const stopTime = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isFinished) {
      stopTime();
      setEndTime(formattedTime(timer));
    }
  }, [isFinished]);

  const addSelectedMap = (name) => {
    setSelectedMap(name);
  };

  const closeModal = () => {
    setIsFinished(false);
  };

  const showModal = (bool) => {
    setIsFinished(bool);
  };

  const ctxValues = {
    selectedMap,
    isFinished,
    images,
    endTime,
    startTime,
    stopTime,
    resetTime,
    addSelectedMap,
    showModal,
    closeModal,
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
