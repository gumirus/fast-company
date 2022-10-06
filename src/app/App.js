import React, { useState } from "react";
import Users from "./components/users";

import api from "./api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    const newUsers = users.filter((user) => user._id !== userId);
    setUsers(newUsers);
  };

  const handleToggleBookMark = (userId) => {
    const newUsers = users.map((user) => {
      if (user._id === userId) user.bookmark = !user.bookmark;
      return user;
    });
    setUsers(newUsers);
  };

  return (
    <>
      <Users
        users={users}
        onDelete={handleDelete}
        onBookMark={handleToggleBookMark}
      />
    </>
  );
}

export default App;
