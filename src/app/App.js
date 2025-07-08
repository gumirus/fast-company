import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import LoginForm from "./components/ui/loginForm";
import RegisterForm from "./components/ui/registerForm";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/users/:userId?/:edit?" element={<Users />} />
        <Route path="/login" element={<Login />}>
          <Route index element={<Navigate to="signIn" />} />
          <Route path="signIn" element={<LoginForm />} />
          <Route path="signUp" element={<RegisterForm />} />
        </Route>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
