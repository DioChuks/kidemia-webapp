import api from "../api";
import ApiResponse from "../res";

interface CountForCard {
    studentsAmount: number;
    subjectsAmount: number;
    topicsAmount: number;
    testsAmount: number;
}


// Fetch Report Card Data Count
export const fetchCardsCount = async (): Promise<CountForCard> => {
    const response = await api.get<ApiResponse<CountForCard>>('/admin/report/topline-count');
    return response.data.data;
};
