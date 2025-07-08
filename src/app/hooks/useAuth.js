import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import authService from "../services/auth.service";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState(null);

  async function signUp(payload) {
    try {
      const data = await authService.register(payload);
      // setUser(data); // Пока не логиним после регистрации
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const value = {
    currentUser,
    signUp
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
