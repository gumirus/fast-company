import React from "react";
import PropTypes from "prop-types";
const BookMark = ({ status }) => {
  const bookmark = "bi bi-bookmark";
  const bookMarkClass = status ? bookmark + "-check-fill" : bookmark;
  return (
    <button className="bookmark">
      <span className={bookMarkClass}></span>
    </button>
  );
};
BookMark.propTypes = {
  status: PropTypes.bool
};

export default BookMark;
