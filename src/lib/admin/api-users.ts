import api from "../api";
import ApiResponse from "../res";

// Define the interfaces for the expected data structures
interface User {
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

// Fetch users function
export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get<ApiResponse<User[]>>('/users');
  return response.data.data;
};

// Fetch Students Count
export const fetchStudentsCount = async (): Promise<User[]> => {
    const response = await api.get<ApiResponse<User[]>>('/users/count-student');
    return response.data.data;
};

// Create user function
export const createUser = async (details: User): Promise<User> => {
  const response = await api.post<ApiResponse<User>>('/users', { details });
  return response.data.data;
};

// Delete user function
export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
