import React, { createContext, useState } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (userData: any) => void;
  logout: () => void;
  userData: any;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  userData: null,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  const login = (data: any) => {
    setIsAuthenticated(true);
    setUserData(data);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
  };

  const authContextValue = {
    isAuthenticated,
    login,
    logout,
    userData,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
