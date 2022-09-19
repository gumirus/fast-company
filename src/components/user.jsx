import React from "react";
import Qualitie from "./qualitte";
import BookMark from "./bookmark";
const User = (props) => {
  const handleClick = () => {
    props.onDelete(props._id);
  };
  return (
    <tr key={props._id}>
      <td>
        <span className="fw-normal">{props.name}</span>
      </td>
      <td>
        {props.qualities.map((item) => (
          <Qualitie key={item._id} color={item.color} name={item.name} />
        ))}
      </td>
      <td>
        <span className="fw-normal">{props.profession.name}</span>
      </td>
      <td>
        <span className="fw-normal">{props.completedMeetings}</span>
      </td>
      <td>
        <span className="fw-normal">{props.rate + "/5"}</span>
      </td>
      <td>{<BookMark {...props} onShangeStatus={props.onChangeStatus} />}</td>
      <td>
        <button className="btn btn-danger" onClick={handleClick}>
          <span className="fw-normal">delete</span>
        </button>
      </td>
    </tr>
  );
};

export default User;
