import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/users/:userId?/:edit?" element={<Users />} />
        <Route path="/login/:type?" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
