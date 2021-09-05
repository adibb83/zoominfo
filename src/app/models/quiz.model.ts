
export interface QuestionResponse {
  results: IQuestion[];
}

export interface IQuiz {
  questions: IQuestion[];
  total: ITotal;
  progress?: number
}


export interface IQuestion {
  id?: number;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers?: string[];
  incorrect_count: number;
}

export interface ITotal {
  incorrect_answers: number;
  correct_answers: number;
}
