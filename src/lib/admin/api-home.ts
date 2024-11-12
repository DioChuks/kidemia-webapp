import api from "../api";
import ApiResponse from "../res";
import { getAuthToken } from "../../utils/auth";

interface CountForCard {
    studentsAmount: number;
    subjectsAmount: number;
    topicsAmount: number;
    testsAmount: number;
}


// Fetch Report Card Data Count
export const fetchCardsCount = async (): Promise<CountForCard> => {
    const token = getAuthToken(); // Retrieve the token

    const config = {
        headers: {
        Authorization: `Bearer ${token}`, // Add the token to Authorization header
        },
    };
    const response = await api.get<ApiResponse<CountForCard>>('/admin/report/topline-count', config);
    return response.data.data;
};
