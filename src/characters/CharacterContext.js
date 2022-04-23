import React from "react";

const CharacterContext = React.createContext({
  character: {
    name: "",
    image: "",
  },
  selectedMap: "",
  images: [],
  isLoading: false,
  addSelectedMap: () => {},
  addCharacter: () => {},
});

export default CharacterContext;
