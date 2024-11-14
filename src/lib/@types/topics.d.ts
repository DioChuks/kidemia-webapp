export interface Topic {
    id: number;
    uuid: string;
    name: string;
    subject_id: number;
}

export interface NewTopic {
    name: string;
    subject_id: number;
    description: string|null;
}

// Define the interface for a single subject stat item
export interface TopicStats {
    id: number;
    uuid: string;
    name: string;
    subject_id: number;
    questions: [];
}