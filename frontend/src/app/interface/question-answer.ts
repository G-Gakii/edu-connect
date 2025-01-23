export interface QuestionAnswer {
  id: number;
  category: string;
  Question: string;
  student_name: string;
  created_at: string;
  showAnswer?: boolean;
  error?: string;
  answer: {
    id: number;
    name: string;
    answer: string;
    thumbs_up: number;
    created_at: string;
    updated_at: string;
  }[];
}
