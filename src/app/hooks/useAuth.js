import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import api from "../api";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  async function logIn({ email, password }) {
    try {
      const data = await authService.login({ email, password });
      setUser(data);
      return data;
    } catch (error) {
      setError(error.message);
    }
  }

  function logOut() {
    localStorageService.removeAuthData();
    setUser(null);
  }

  async function signUp(payload) {
    try {
      const data = await authService.register(payload);
      return data;
    } catch (error) {
      setError(error.message);
    }
  }
  async function getUserData() {
    try {
      const userId = localStorageService.getUserId();
      if (userId) {
        const user = await api.users.getById(userId);
        setUser(user);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getUserData();
  }, []);

  const value = {
    currentUser,
    signUp,
    logIn,
    logOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : "Loading..."}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
