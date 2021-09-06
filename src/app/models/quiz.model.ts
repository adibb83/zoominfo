
export interface QuestionResponse {
  results: IQuestion[];
}

export interface IQuiz {
  questions: IQuestion[];
  answers: IAnswering;
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
}

export interface IAnswering {
  incorrect_answers: number;
  correct_answers: number;
}
