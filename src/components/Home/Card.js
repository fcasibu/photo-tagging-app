import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ name, url }) => {
  return (
    <React.Fragment>
      <Link to={name}>
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
