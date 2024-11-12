import api from "../api";
import ApiResponse from "../res";

interface Question {
    id: number;
    subject_id: number;
    topic_id: number;
    uuid: string;
    title: string;
    options: string[];
    correct_answer: string;
    solution: string;
    is_answer_multi: boolean;
}

interface NewQuestion {
    subject_id: number;
    topic_id: number;
    title: string;
    options: string[];
    correct_answer: string;
    solution: string;
    is_answer_multi: boolean;
}

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
