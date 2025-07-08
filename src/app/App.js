import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import LoginForm from "./components/ui/loginForm";
import RegisterForm from "./components/ui/registerForm";
import { AuthProvider } from "./hooks/useAuth";
import ProfessionsListPage from "./components/page/professionsListPage/professionsListPage";

function App() {
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/users/:userId?/:edit?" element={<Users />} />
          <Route path="/login" element={<Login />}>
            <Route index element={<Navigate to="signIn" />} />
            <Route path="signIn" element={<LoginForm />} />
            <Route path="signUp" element={<RegisterForm />} />
          </Route>
          <Route path="/professions" element={<ProfessionsListPage />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
