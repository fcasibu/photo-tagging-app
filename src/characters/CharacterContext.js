import React from "react";

const CharacterContext = React.createContext({
  selectedMap: "",
  images: [],
  addSelectedMap: () => {},
});

export default CharacterContext;
