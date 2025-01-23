import { Question } from "../@types/questions";
import api from "../api";
import ApiResponse from "../res";

export const fetchBatchQuestions = async (question_ids: number[]): Promise<Question[]> => {
    const response = await api.post<ApiResponse<Question[]>>('/questions/batch', { question_ids });
    return response.data.data;
}
