import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = (props) => {
  const {
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark
  } = props;
  const { onDelete, onBookMark } = props;

  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((qual) => (
          <Qualitie key={qual._id} {...qual} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} / 5</td>
      <td>
        <div className="m-2" onClick={() => onBookMark(_id)}>
          <BookMark status={bookmark} />
        </div>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(_id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};
User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBookMark: PropTypes.func.isRequired
};

export default User;
