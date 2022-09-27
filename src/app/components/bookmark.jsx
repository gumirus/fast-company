import React from "react";
import PropTypes from "prop-types";
const BookMark = ({ status }) => {
  const bookmark = "bi bi-bookmark";
  const bookMarkClass = status ? bookmark + "-check-fill" : bookmark;
  return (
    <button type="button" className="btn btn-outline-dark">
      <i className={bookMarkClass}></i>
    </button>
  );
};
BookMark.propTypes = {
  status: PropTypes.bool
};
export default BookMark;
