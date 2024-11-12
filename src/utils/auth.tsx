import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const getAuthToken = (): string | null => {
    const { userData } = useContext(AuthContext);
    if (userData) {
      return userData.token;
    }
    return null;
  };
  