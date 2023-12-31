// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [visitUser, setUserVisit] = useState(null);
  const [visitPost, setVisitPost] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authUser,
        visitUser,
        visitPost,
        searchValue,
        login,
        logout,
        setAuthUser,
        setUserVisit,
        setVisitPost,
        setSearchValue,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
