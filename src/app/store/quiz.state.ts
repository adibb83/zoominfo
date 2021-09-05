
import { IQuiz } from '@models/quiz.model';

export default interface QuizState {
  Quiz: IQuiz;
  QuizError: Error;
}

export const initializeState = (): QuizState => {
  return { Quiz: null, QuizError: null };
};
