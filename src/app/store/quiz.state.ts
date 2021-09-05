
import { IQuiz } from '@models/quiz.model';

export default interface QuizState {
  Quiz: IQuiz;
}

export const initializeState = (): QuizState => {
  return { Quiz: null };
};
