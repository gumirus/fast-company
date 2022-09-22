import React from "react";
const BookMark = ({ status }) => {
  const bookmark = "bi bi-bookmark";
  const bookMarkClass = status ? bookmark + "-check-fill" : bookmark;
  return (
    <button>
      <i className={bookMarkClass}></i>
    </button>
  );
};
export default BookMark;
