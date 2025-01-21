import { IAuthUser, User } from '@/lib/@types/users';
import React, { createContext, useEffect, useState } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (userData: IAuthUser) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void; // Allow partial updates
  userData: IAuthUser | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  userData: null,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUserData = sessionStorage.getItem('userData');
    return storedUserData ? true : false;
  });

  const [userData, setUserData] = useState<IAuthUser | null>(() => {
    const storedUserData = sessionStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const login = (data: IAuthUser) => {
    sessionStorage.setItem('userData', JSON.stringify(data));
    setIsAuthenticated(true);
    setUserData(data);
  };

  const updateUser = (data: Partial<User>) => {
    setUserData((prevState) => {
      if (!prevState) return null;

      const updatedUserData = {
        ...prevState,
        user: {
          ...prevState.user,
          ...data,
        },
      };

      sessionStorage.setItem('userData', JSON.stringify(updatedUserData));
      return updatedUserData;
    });
  };

  const logout = () => {
    sessionStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUserData(null);
  };

  useEffect(() => {
    if (!isAuthenticated || !userData) {
      setIsAuthenticated(false);
      sessionStorage.removeItem('userData');
    }
  }, [userData, isAuthenticated]);

  const authContextValue = {
    isAuthenticated,
    login,
    updateUser,
    logout,
    userData,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
