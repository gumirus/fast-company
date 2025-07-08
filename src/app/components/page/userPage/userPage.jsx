import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import Avatar from "../../ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";

const UserPage = ({ userId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);
  const handleClick = () => {
    navigate(location.pathname + "/edit");
  };
  if (user) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-4">
                  <Avatar user={user} size="xl" />
                  <div className="ms-3">
                    <h1 className="mb-0">{user.name}</h1>
                    <p className="text-muted mb-0">{user.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h5>Профессия: {user.profession.name}</h5>
                    <h5>
                      Пол:{" "}
                      {user.sex === "male"
                        ? "Мужской"
                        : user.sex === "female"
                        ? "Женский"
                        : "Другой"}
                    </h5>
                  </div>
                  <div className="col-md-6">
                    <h5>Встретился, раз: {user.completedMeetings}</h5>
                    <h5>Оценка: {user.rate}</h5>
                  </div>
                </div>
                <div className="mt-3">
                  <h6>Качества:</h6>
                  <Qualities qualities={user.qualities} />
                </div>
                <div className="mt-4">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={handleClick}
                  >
                    Изменить
                  </button>
                </div>
              </div>
            </div>
          </div>
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
