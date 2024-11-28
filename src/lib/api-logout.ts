import api from "./api";
import { LogoutResponse } from "./res";

export const attemptLogout = async () => {
    const response = await api.post<LogoutResponse>('/auth/logout');
    return response.data;
}
