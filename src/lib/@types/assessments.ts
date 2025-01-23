export interface AsTest {
    id: number;
    uuid: string;
    user_id: number;
    subject_id: string;
    topic_ids: number[];
    question_ids: number[];
    created_at: Date;
    updated_at: Date;    
}

export interface AsExam {
    id: number;
    uuid: string;
    user_id: number;
    subject_ids: number[];
    topic_ids: number[];
    question_ids: number[];
    created_at: Date;
    updated_at: Date;
}

export interface Assessment {
    id: number;
    uuid: string;
    user_id: number;
    score: number;
    attempted_questions: number;
    type: string;
    time_taken: number;
    created_at: Date;
    updated_at: Date;
}

export interface AssessmentRequest {
    minutes_left: number;
    seconds_left: number;
    subject_ids: string[];
    topic_ids: string[];
    question_ids: string[];
}

interface Answer {
    question_id: number;
    answer_index: number;
}
  
export interface Payload {
    uuid: string; // ID of the test (e.g., test identifier)
    minutes_left: number; // Remaining minutes
    seconds_left: number; // Remaining seconds
    answers: Answer[]; // List of answers selected for each question
}
  