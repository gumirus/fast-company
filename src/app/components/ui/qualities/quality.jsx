import React from "react";
import PropTypes from "prop-types";

const Quality = ({ color, name, positive }) => {
  // Сокращаем длинные названия до 8 символов + '…'
  const shortName = name.length > 8 ? name.slice(0, 8) + "…" : name;
  return (
    <span
      className={"badge m-1 p-2 bg-" + color}
      style={{
        minWidth: 120,
        maxWidth: 140,
        display: "inline-block",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        verticalAlign: "middle",
        cursor: "pointer"
      }}
      title={name}
    >
      {positive === true ? (
        <span role="img" aria-label="Положительное" className="me-1">
          👍
        </span>
      ) : positive === false ? (
        <span role="img" aria-label="Отрицательное" className="me-1">
          👎
        </span>
      ) : null}
      {shortName}
    </span>
  );
};
Quality.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  positive: PropTypes.bool
};

export default Quality;
