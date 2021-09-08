import { IQuiz } from '@models/quiz.model';

export default interface QuizState {
  quiz: IQuiz;
}

export const initializeState: QuizState = {
  quiz: {
    questions: [],
    answers: { correct_answers: 0, incorrect_answers: 0 },
    currentQuestion: null,
    isFinished: false,
  },
};
