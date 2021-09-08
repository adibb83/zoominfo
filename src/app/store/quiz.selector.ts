import { createFeatureSelector, createSelector } from '@ngrx/store';
import QuizState from './quiz.state';

export const selectQuizState = createFeatureSelector<QuizState>('quiz');

export const selectQuiz = createSelector(
  selectQuizState,
  (state: QuizState) => state.quiz
);

export const selectQuestions = createSelector(
  selectQuizState,
  (state: QuizState) => state.quiz.questions
);

export const selectAnswers = createSelector(
  selectQuizState,
  (state: QuizState) => state.quiz.answers
);

export const selectCurrentQuestion = createSelector(
  selectQuizState,
  (state: QuizState) => state.quiz.currentQuestion
);

export const selectQuizStatus = createSelector(
  selectQuizState,
  (state: QuizState) => state.quiz.isFinished
);
