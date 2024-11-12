import { AxiosError } from "axios";
import api from "../api";
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
  const response = await api.post<ApiResponse<UserAdmin>>('/auth/admin/login', {
    email,
    password
  });
  if (response.status !== 200) {
    throw new AxiosError(response.data.message)
  }
  return response.data.data;
};
