import { AsExam, AsTest } from "../@types/assessments";
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
