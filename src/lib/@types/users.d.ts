export interface User {
    id: number;
    category_id: number;
    name: string;
    email: string;
    email_verified_at: null | Date;
    photo: null | string;
    otp: null | string;
    category_status: boolean;
    guardian_email: null | string;
    role: string;
    created_at: Date;
    updated_at: Date;
}

export interface IAuthUser {
    user: User;
    token: string;
}

export interface IRegisterUser {
    role: "student" | "school";
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    category_id: number | null;
    guardian_email: string;
}