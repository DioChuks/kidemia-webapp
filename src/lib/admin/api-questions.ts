import { NewQuestion, Question } from "../@types/questions";
import api from "../api";
import ApiResponse from "../res";

export const fetchQuestions = async (): Promise<Question[]> => {
    const response = await api.get<ApiResponse<Question[]>>('/questions');
    return response.data.data;
}

export const storeQuestion = async (data: FormData): Promise<NewQuestion> => {
    const response = await api.post<ApiResponse<NewQuestion>>('/questions', data);
    return response.data.data;
}

export const fetchQuestion = async (id:string|number): Promise<Question> => {
    const response = await api.get<ApiResponse<Question>>(`/questions/${id}`);
    return response.data.data;
}
