/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import Avatar from "./avatar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const getBadgeColor = (percent) => {
  if (percent >= 70) return "bg-success";
  if (percent >= 40) return "bg-warning text-dark";
  return "bg-danger";
};

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookMark,
  onDelete
}) => {
  // Вычисляем максимальные значения для процента
  const maxRate = users.length > 0 ? Math.max(...users.map((u) => u.rate)) : 5;
  const maxMeetings =
    users.length > 0 ? Math.max(...users.map((u) => u.completedMeetings)) : 1;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Карточка пользователя для мобильных
  function UserCard({ user }) {
    const percentRate = maxRate ? Math.round((user.rate / maxRate) * 100) : 0;
    const percentMeet = maxMeetings
      ? Math.round((user.completedMeetings / maxMeetings) * 100)
      : 0;
    return (
      <div className="card mb-3 w-100">
        <div className="card-body d-flex align-items-center">
          <Avatar user={user} size="md" />
          <div className="ms-3 flex-grow-1">
            <div className="d-flex align-items-center justify-content-between">
              <Link
                to={`/users/${user._id}`}
                className="fw-bold text-dark"
                style={{ fontSize: "1.1rem" }}
              >
                {user.name}
              </Link>
              <div
                onClick={() => onToggleBookMark(user._id)}
                style={{ cursor: "pointer" }}
              >
                <BookMark status={user.bookmark} />
              </div>
            </div>
            <div className="text-muted" style={{ fontSize: "0.97rem" }}>
              {user.profession.name}
            </div>
            <div className="mt-2 d-flex flex-wrap gap-2 align-items-center">
              <span className={`badge ${getBadgeColor(percentRate)}`}>
                Рейтинг: {user.rate}
              </span>
              <span className={`badge ${getBadgeColor(percentMeet)}`}>
                Встреч: {user.completedMeetings}
              </span>
            </div>
            <div className="mt-2">
              <Qualities qualities={user.qualities} />
            </div>
          </div>
          <button
            onClick={() => onDelete(user._id)}
            className="btn btn-danger btn-sm ms-2"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }
  UserCard.propTypes = {
    user: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      profession: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired,
      rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      completedMeetings: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]).isRequired,
      bookmark: PropTypes.bool,
      qualities: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object // если вдруг qualities приходит как объект
      ])
    }).isRequired
  };

  if (isMobile) {
    return (
      <div className="d-flex flex-column gap-2">
        {users.map((user) => (
          // eslint-disable-next-line react/prop-types
          <UserCard user={user} key={user._id} />
        ))}
      </div>
    );
  }

  const columns = {
    avatar: {
      name: "Аватар",
      component: (user) => <Avatar user={user} size="md" />
    },
    name: {
      path: "name",
      name: "Имя",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: {
      path: "completedMeetings",
      name: "Встретился, раз",
      component: (user) => {
        const percent = maxMeetings
          ? Math.round((user.completedMeetings / maxMeetings) * 100)
          : 0;
        return (
          <span className={`badge ${getBadgeColor(percent)}`}>
            {user.completedMeetings}
          </span>
        );
      }
    },
    rate: {
      path: "rate",
      name: "Оценка",
      component: (user) => {
        const percent = maxRate ? Math.round((user.rate / maxRate) * 100) : 0;
        return (
          <span className={`badge ${getBadgeColor(percent)}`}>{user.rate}</span>
        );
      }
    },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <div className="m-2" onClick={() => onToggleBookMark(user._id)}>
          <BookMark status={user.bookmark} />
        </div>
      )
    },
    delete: {
      component: (user) => (
        <button onClick={() => onDelete(user._id)} className="btn btn-danger">
          delete
        </button>
      )
    }
  };
  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      profession: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired,
      rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      completedMeetings: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]).isRequired,
      bookmark: PropTypes.bool,
      qualities: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    })
  ).isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UsersTable;
