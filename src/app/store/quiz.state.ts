
import { IAnswering, IQuestion, IQuiz } from '@models/quiz.model';

export default interface QuizState {
  loading: boolean; // loading indicator
  quiz: IQuiz;
  currentQuestion: IQuestion; // question that is displayed on screen
  answers: IAnswering; // answers are stored to show the score at the end
  isFinished: boolean;
  progress: number;
}

export const initializeState = (): QuizState => {
  return {
    loading: false,
    quiz: null,
    currentQuestion: null,
    answers: null,
    isFinished: false,
    progress: 0
  };
};
