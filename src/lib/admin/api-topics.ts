// api-subjects.ts
import { getAuthToken } from "../../utils/auth";
import api from "../api";
import ApiResponse from "../res"; // Assuming this is where the base ApiResponse interface is located

interface Topic {
    id: number;
    uuid: string;
    name: string;
    subject_id: number;
}

interface NewTopic {
    name: string;
    subject_id: number;
    description: string|null;
}

// Define the interface for a single subject stat item
interface TopicStats {
    id: number;
    uuid: string;
    name: string;
    subject_id: number;
    questions: [];
}

// Define the response structure for the getSubjects endpoint
interface GetTopicStatsResponse extends ApiResponse<TopicStats[]> {
    data: TopicStats[];
}

const token = getAuthToken(); // Retrieve the token

const config = {
    headers: {
    Authorization: `Bearer ${token}`, // Add the token to Authorization header
    },
};

export const fetchTopics = async (): Promise<Topic[]> => {
    const response = await api.get<ApiResponse<Topic[]>>('/topics', config);
    return response.data.data;
}

export const storeTopic = async (data: NewTopic): Promise<NewTopic> => {
    const response = await api.post<ApiResponse<NewTopic>>('/topics', data, config);
    return response.data.data;
}

export const fetchTopicsBySubjectId = async (id: number): Promise<Topic[]> => {
    const response = await api.get<ApiResponse<Topic[]>>(`/topics/subjects/${id}`, config);
    return response.data.data;
}

export const fetchTopic = async (id:string|number): Promise<Topic> => {
    const response = await api.get<ApiResponse<Topic>>(`/topics/${id}`, config);
    return response.data.data;
}

// Fetch subjects with their question and topic counts
export const fetchTopicStats = async (): Promise<GetTopicStatsResponse> => {
    const response = await api.get<GetTopicStatsResponse>('/admin/report/topic-stats', config);
    return response.data;
};

const deleteConfig = {
    headers: {
    Authorization: `Bearer ${token}`,
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
