interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}

export interface LogoutResponse {
    status: string;
    message: string;
    data: null;
}

export default ApiResponse