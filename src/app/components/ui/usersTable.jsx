import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import Avatar from "./avatar";
import { Link } from "react-router-dom";

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
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UsersTable;
