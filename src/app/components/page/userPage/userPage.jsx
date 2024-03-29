import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);
  const handleClick = () => {
    history.push(history.location.pathname + "/edit");
  };
  if (user) {
    return (
      <div className="container mt-5">
        <div>
          <h1> {user.name}</h1>
          <h2>Профессия: {user.profession.name}</h2>
          <Qualities qualities={user.qualities} />
          <h5>Встретился , раз : {user.completedMeetings}</h5>
          <h2>Rate: {user.rate}</h2>
          <button className="btn btn-outline-secondary" onClick={handleClick}>
            Изменить
          </button>
        </div>
      </div>
    );
  } else {
    return <h3>Loading...</h3>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
