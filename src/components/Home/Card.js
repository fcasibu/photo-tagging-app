import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ name, imageURL }) => {
  return (
    <div>
      <Link to={name}>
        <img src={imageURL} alt={name} />
        <h2>{name}</h2>
      </Link>
    </div>
  );
};

export default Card;

Card.propTypes = {
  name: PropTypes.string,
  imageURL: PropTypes.string,
};
