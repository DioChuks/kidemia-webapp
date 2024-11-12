import React, { createContext, useEffect, useState } from 'react';

interface AuthUser {
    user: {
      id: number;
      category_id?: number;
      name: string;
      email: string;
      email_verified_at: null|Date;
      photo: null|string;
      otp: null|string;
      category_status: boolean;
      guardian_email: null|string;
      role: string;
      created_at: Date;
      updated_at: Date; 
    },
    token: string
}

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (userData: AuthUser) => void;
  updateUser: (newData: Partial<AuthUser>) => void;
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

      const [userData, setUserData] = useState<AuthUser | object>(() => {
        const storedUserData = sessionStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : {};
      });

  const login = (data: AuthUser) => {
    sessionStorage.setItem('userData', JSON.stringify(data));
    setIsAuthenticated(true);
    setUserData(data);
  };

  const updateUser = (data: Partial<AuthUser>) => {
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
