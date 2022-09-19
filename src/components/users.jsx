import React from "react";
import User from "./user";

const Users = ({ users, ...rest }) => {
  const tableHeader = [
    "Имя",
    "Качества",
    "Профессия",
    "Встретился, раз",
    "Оценка",
    "Избранное",
    "",
  ];
  return (
    <table className="table table-responsive">
      <thead className="table-light" hidden={users.length === 0}>
        <tr>
          {tableHeader.map((name) => (
            <th scope="col" key={name}>
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((item) => (
          <User
            status={false}
            key={item._id}
            {...item}
            onDelete={rest.onItemDelete}
            onChangeStatus={rest.onShangeStatus}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Users;
