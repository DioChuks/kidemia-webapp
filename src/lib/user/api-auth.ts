import { IAuthUser, IRegisterUser } from "../@types/users";
import { env } from "../api";

// Admin Login function
export const attemptLogin = async (email: string, password: string): Promise<IAuthUser> => {
  const response = await fetch(`${env.local}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message)
  }
  
  return json.data
};

export const attemptRegister = async (data: IRegisterUser): Promise<IAuthUser> => {
  const response = await fetch(`${env.local}/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message)
  }
  
  return json.data
}
