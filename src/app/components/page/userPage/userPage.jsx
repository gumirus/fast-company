import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import Avatar from "../../ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";
import apiAll from "../../../api";

const UserPage = ({ userId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState();
  const [maxMeetings, setMaxMeetings] = useState(1);
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
    apiAll.users.fetchAll().then((users) => {
      const max =
        users && users.length > 0
          ? Math.max(...users.map((u) => u.completedMeetings || 0))
          : 1;
      setMaxMeetings(max);
    });
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
                    <h5 className="d-flex align-items-center gap-2">
                      Встретился, раз:
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          background: (() => {
                            const percent = maxMeetings
                              ? Math.round(
                                  (user.completedMeetings / maxMeetings) * 100
                                )
                              : 0;
                            if (percent >= 70) return "#198754"; // зелёный
                            if (percent >= 40) return "#ffc107"; // жёлтый
                            return "#dc3545"; // красный
                          })(),
                          color: (() => {
                            const percent = maxMeetings
                              ? Math.round(
                                  (user.completedMeetings / maxMeetings) * 100
                                )
                              : 0;
                            return percent >= 40 && percent < 70
                              ? "#212529"
                              : "#fff";
                          })(),
                          fontWeight: 700,
                          fontSize: 20,
                          boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
                        }}
                        title={`Встреч: ${user.completedMeetings}`}
                      >
                        {user.completedMeetings}
                      </span>
                    </h5>
                    <h5 className="d-flex align-items-center gap-2">
                      Оценка:
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          background:
                            user.rate >= 4
                              ? "#198754"
                              : user.rate >= 2.5
                              ? "#ffc107"
                              : "#dc3545",
                          color:
                            user.rate >= 2.5 && user.rate < 4
                              ? "#212529"
                              : "#fff",
                          fontWeight: 700,
                          fontSize: 20,
                          boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
                        }}
                        title={`Рейтинг: ${user.rate}`}
                      >
                        {user.rate}
                      </span>
                    </h5>
                  </div>
                </div>
                <div className="mt-3">
                  <h6>Качества:</h6>
                  <Qualities qualities={user.qualities} />
                </div>
                <div className="mt-4 d-flex align-items-center gap-3">
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={handleClick}
                  >
                    Изменить
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/users")}
                  >
                    Вернуться к списку
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
