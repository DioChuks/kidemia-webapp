import { NewTopic, Topic, TopicStats } from "../@types/topics";
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

export const storeTopic = async (data: NewTopic): Promise<NewTopic> => {
    const response = await api.post<ApiResponse<NewTopic>>('/topics', data);
    return response.data.data;
}

export const fetchTopicsBySubjectId = async (id: number): Promise<Topic[]> => {
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

const deleteConfig = {
    headers: {
        method: 'DELETE',
    },
};

export const deleteTopic = async (topicId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this topic? Yes or No");

    if (confirmDelete) {
      try {
        // Send delete request to the API endpoint
        const response = await api.delete(`/topics/${topicId}/delete`, deleteConfig);

        if (response.status == 200) {
          // Handle successful deletion (e.g., update state, show message, etc.)
          alert("Topic deleted successfully!");
          // Optionally, re-fetch the subject data or update the state to remove the deleted topic
        } else {
          alert("Failed to delete the topic. Please try again.");
        }
      } catch (error) {
        alert("An error occurred while deleting the topic. Please try again.");
      }
    }
}
