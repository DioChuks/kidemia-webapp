import { AsExam, Assessment, AsTest, Payload } from "../@types/assessments";
import api from "../api";
import ApiResponse from "../res";

export const createTestOrExam = async (data: any, type: string): Promise<AsExam | AsTest> => {
    if (type === 'exam') {
        const response = await api.post<ApiResponse<AsExam>>('/assessments/exams', data);
        return response.data.data;
    }
    const response = await api.post<ApiResponse<AsTest>>('/assessments/tests', data);
    return response.data.data;
}

export const fetchAssessment = async (id: string, type: string): Promise<AsTest | AsExam> => {
    if (type === 'exam') {
        const response = await api.get<ApiResponse<AsExam>>(`/assessments/exams/${id}`);
        return response.data.data;
    }
    const response = await api.get<ApiResponse<AsTest>>(`/assessments/tests/${id}`);
    return response.data.data;
}


export const submitAssessment = async (data: Payload): Promise<Assessment> => {
    const response = await api.post<ApiResponse<Assessment>>('/assessments', data);
    return response.data.data;
}