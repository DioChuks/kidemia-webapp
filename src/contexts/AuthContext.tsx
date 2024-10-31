import React, { createContext, useEffect, useState } from 'react';

interface AuthDataProps {
    user: object,
    token: string
}

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (userData: AuthDataProps) => void;
  updateUser: (newData: Partial<AuthDataProps>) => void;
  logout: () => void;
  userData: any;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  updateUser: () => {},
  logout: () => {},
  userData: {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedUserData = sessionStorage.getItem('userData');
        return storedUserData ? true : false;
      });

      const [userData, setUserData] = useState<AuthDataProps | object>(() => {
        const storedUserData = sessionStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : {};
      });

  const login = (data: AuthDataProps) => {
    sessionStorage.setItem('userData', JSON.stringify(data));
    setIsAuthenticated(true);
    setUserData(data);
  };

  const updateUser = (data: Partial<AuthDataProps>) => {
    setUserData((prevState) => {
        if (!prevState) return {};

        const updatedUserData = {
          ...prevState,
          user: {
            ...prevState,
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
    setUserData({});
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
