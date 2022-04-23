import React from "react";

const CharacterContext = React.createContext({
  endTime: "",
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
