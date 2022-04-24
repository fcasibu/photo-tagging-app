import React from "react";

const CharacterContext = React.createContext({
  endTime: 0,
  digitalTime: "",
  selectedMap: "",
  images: [],
  isFinished: false,
  startTime: () => {},
  stopTime: () => {},
  resetTime: () => {},
  addSelectedMap: () => {},
  showModal: () => {},
  hideModal: () => {},
});

export default CharacterContext;
