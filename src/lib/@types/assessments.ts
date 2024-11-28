export interface AsTest {
    id: number;
    uuid: string;
    user_id: number;
    subject_id: string;
    topic_ids: string[];
    question_ids: string[];
    created_at: Date;
    updated_at: Date;    
}

export interface AsExam {
    id: number;
    uuid: string;
    user_id: number;
    subject_ids: string[];
    topic_ids: string[];
    question_ids: string[];
    created_at: Date;
    updated_at: Date;
}