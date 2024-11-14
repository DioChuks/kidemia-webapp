export interface Question {
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

export interface NewQuestion {
    subject_id: number;
    topic_id: number;
    title: string;
    options: string[];
    correct_answer: string;
    solution: string;
    is_answer_multi: boolean;
}