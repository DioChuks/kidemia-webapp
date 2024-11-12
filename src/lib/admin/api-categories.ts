import api from "../api";
import ApiResponse from "../res";

// Define the interfaces for the expected data structures
interface Category {
  id: number;
  name: string;
  created_at: string | null;
  updated_at: string | null;
}

// Fetch categories function
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.get<ApiResponse<Category[]>>('/categories');
  return response.data.data;
};

// Create category function
export const createCategory = async (name: string, description: string): Promise<Category> => {
  const response = await api.post<ApiResponse<Category>>('/categories', { name, description });
  return response.data.data;
};

// Delete category function
export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
