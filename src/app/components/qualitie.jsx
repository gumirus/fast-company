import React from "react";

const Qualitie = ({ color, name }) => {
  const classes = "btn m-1 btn-" + color;
  return <li className={classes}>{name}</li>;
};

export default Qualitie;
