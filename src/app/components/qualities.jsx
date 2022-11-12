import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ color, name }) => {
  const classes = "btn m-1 btn-" + color;
  return <li className={classes}>{name}</li>;
};
Qualities.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Qualities;
