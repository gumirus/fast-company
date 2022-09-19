import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";
import BookMark from "./components/bookmark";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((line) => line._id !== userId));
  };

  const handleToggleMark = (userId) => {
    const newUsers = users.map((item) => ({
      ...item,
      status: item._id === userId ? !item.status : item.status,
    }));
    setUsers(newUsers);
  };

  return (
    <>
      <SearchStatus number={users.length} />
      <Users
        key={users._id}
        users={users}
        onItemDelete={handleDelete}
        onShangeStatus={handleToggleMark}
      />
    </>
  );
}

export default App;
