import api from "../api";
import ApiResponse from "../res";

interface Subject {
    id: number;
    uuid: string;
    name: string;
    category_id: number;
    color: string;
    topics: [];
}

interface NewSubject {
    name: string;
    category_id: number;
    color: string|null;
}

// Define the interface for a single subject stat item
interface SubjectStats {
    id: number;
    uuid: string;
    name: string;
    category_id: number;
    no_of_questions: number;
    no_of_topics: number;
}

// Define the response structure for the getSubjects endpoint
interface GetSubjectStatsResponse extends ApiResponse<SubjectStats[]> {
    data: SubjectStats[];
}

const fileUploadConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
}

export const importSubjects = async (data: FormData) => {
    const response = await api.post<ApiResponse<{}>>('/subjects/import', data, fileUploadConfig);
    return response.data.message;
}

export const fetchSubjects = async (): Promise<Subject[]> => {
    const response = await api.get<ApiResponse<Subject[]>>('/subjects');
    return response.data.data;
}

export const storeSubject = async (data: NewSubject): Promise<Subject> => {
    const response = await api.post<ApiResponse<Subject>>('/subjects', data);
    return response.data.data;
}

export const fetchSubject = async (id:string|number): Promise<Subject> => {
    const response = await api.get<ApiResponse<Subject>>(`/subjects/${id}`);
    return response.data.data;
}

export const fetchSubjectsByCategory = async (category_id: number): Promise<Subject[]> => {
    const response = await api.get<ApiResponse<Subject[]>>(`/subjects?category_id=${category_id}`);
    return response.data.data;
};

// Fetch subjects with their question and topic counts
export const fetchSubjectStats = async (): Promise<GetSubjectStatsResponse> => {
    const response = await api.get<GetSubjectStatsResponse>('/admin/report/subject-stats');
    return response.data;
};

const deleteConfig = {
    headers: {
        method: 'DELETE',
    },
};

export const deleteSubject = async (subjectId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this subject? Yes or No");

    if (confirmDelete) {
      try {
        // Send delete request to the API endpoint
        const response = await api.delete(`/subjects/${subjectId}/delete`, deleteConfig);

        if (response.status == 200) {
          // Handle successful deletion (e.g., update state, show message, etc.)
          alert("Subject deleted successfully!");
          // Optionally, re-fetch the subject data or update the state to remove the deleted topic
        } else {
          alert("Failed to delete the subject. Please try again.");
        }
      } catch (error) {
        alert("An error occurred while deleting the subject. Please try again.");
      }
    }
}
