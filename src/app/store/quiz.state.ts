import { IAnswering, IQuestion, IQuiz } from '@models/quiz.model';

export default interface QuizState {
  quiz: IQuiz;
}

export const initializeState = (): QuizState => {
  return {
    quiz: {
      questions: [],
      answers: { correct_answers: 0, incorrect_answers: 0 },
      currentQuestion: null,
    },
  };
};
