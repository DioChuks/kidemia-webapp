export interface Subject {
    id: number;
    uuid: string;
    name: string;
    category_id: number;
    color: string;
    topics: [];
}

export interface NewSubject {
    name: string;
    category_id: number;
    color: string|null;
}

// Define the interface for a single subject stat item
export interface SubjectStats {
    id: number;
    uuid: string;
    name: string;
    category_id: number;
    no_of_questions: number;
    no_of_topics: number;
}