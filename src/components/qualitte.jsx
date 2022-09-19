import React from "react";

const Qualitie = ({ color, name, _id }) => {
  return (
    <span className={"fw-normal m-1 badge bg-" + color} key={_id}>
      {name}
    </span>
  );
};

export default Qualitie;
