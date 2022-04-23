import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CharacterContext from "../../characters/CharacterContext";

const Card = ({ name, url }) => {
  const { addSelectedMap } = useContext(CharacterContext);

  return (
    <React.Fragment>
      <Link to={name} onClick={() => addSelectedMap(name)}>
        <img src={url} alt={name} />
        <p>{name}</p>
      </Link>
    </React.Fragment>
  );
};

export default Card;

Card.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
};
