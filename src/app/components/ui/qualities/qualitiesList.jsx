import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
  if (!qualities || qualities.length === 0) return null;
  // Фильтруем только валидные объекты с positive
  const valid = qualities.filter((q) => q && typeof q.positive !== "undefined");
  const positive = valid.filter((q) => q.positive === true);
  const negative = valid.filter((q) => q.positive === false);
  return (
    <>
      {positive.length > 0 && (
        <div className="mb-1 d-inline">
          {positive.map((qual) => (
            <Quality key={qual._id} {...qual} />
          ))}
        </div>
      )}
      {negative.length > 0 && (
        <div className="d-inline">
          {negative.map((qual) => (
            <Quality key={qual._id} {...qual} />
          ))}
        </div>
      )}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
