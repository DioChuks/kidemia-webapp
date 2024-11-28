import { NewQuestion, Question } from "../@types/questions";
import api from "../api";
import ApiResponse from "../res";

const fileUploadConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
}

export const fetchQuestions = async (): Promise<Question[]> => {
    const response = await api.get<ApiResponse<Question[]>>('/questions');
    return response.data.data;
}

export const storeQuestion = async (data: FormData): Promise<NewQuestion> => {
    const response = await api.post<ApiResponse<NewQuestion>>('/questions', data);
    return response.data.data;
}

export const importQuestions = async (data: FormData) => {
    const response = await api.post<ApiResponse<{}>>('/questions/import', data, fileUploadConfig);
    return response.data.message;
}

export const fetchQuestion = async (id:string|number): Promise<Question> => {
    const response = await api.get<ApiResponse<Question>>(`/questions/${id}`);
    return response.data.data;
}
