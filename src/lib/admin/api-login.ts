import { AxiosError } from "axios";
import api, { env } from "../api";
import ApiResponse from "../res";

// Define the interfaces for the expected data structures
interface UserAdmin {
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
  }
  token: string;
}

// Admin Login function
export const attemptLogin = async (email:string, password:string): Promise<UserAdmin> => {
  const response = await fetch(`${env.prod}/auth/admin/login`, {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  console.log(json);
  return json.data
};
