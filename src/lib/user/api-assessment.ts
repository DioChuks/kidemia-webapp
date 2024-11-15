import { AsTest } from "../@types/assessments";
import { Topic } from "../@types/topics";
import api from "../api";
import ApiResponse from "../res";

export const fetchTopics = async (): Promise<Topic[]> => {
    const response = await api.get<ApiResponse<Topic[]>>('/topics');
    return response.data.data;
}

export const fetchTopicsBySubjectId = async (id: string): Promise<Topic[]> => {
    const response = await api.get<ApiResponse<Topic[]>>(`/topics/subjects/${id}`);
    return response.data.data;
}

export const fetchTopic = async (id:string|number): Promise<Topic> => {
    const response = await api.get<ApiResponse<Topic>>(`/topics/${id}`);
    return response.data.data;
}

export const createTestOrExam = async (data: any): Promise<AsTest> => {
    const response = await api.post<ApiResponse<AsTest>>('/assessments', data);
    return response.data.data;
}
