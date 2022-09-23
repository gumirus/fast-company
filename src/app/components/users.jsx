import React from "react";
import User from "./user";

const Users = ({ users, ...rest }) => {
  const renderTable = () => {
    return users && users.length !== 0 ? (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user._id} {...rest} {...user} />
          ))}
        </tbody>
      </table>
    ) : (
      ""
    );
  };

  return <>{renderTable()}</>;
};

export default Users;
