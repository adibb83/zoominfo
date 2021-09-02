
export interface IQuiz {
  questions: IQuestion[];
  total: ITotal;
}


export interface IQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  incorrect_options: number;
}

export interface Answering {
  questionId: string;
  answerIndex: number;
}

export interface ITotal {
  incorrect_answers: number;
  correct_answer: number;
}
