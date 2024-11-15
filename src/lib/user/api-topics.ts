import { Topic, TopicStats } from "../@types/topics";
import api from "../api";
import ApiResponse from "../res";

// Define the response structure for the getSubjects endpoint
interface GetTopicStatsResponse extends ApiResponse<TopicStats[]> {
    data: TopicStats[];
}

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

// Fetch subjects with their question and topic counts
export const fetchTopicStats = async (): Promise<GetTopicStatsResponse> => {
    const response = await api.get<GetTopicStatsResponse>('/admin/report/topic-stats');
    return response.data;
};
