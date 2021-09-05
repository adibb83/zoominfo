
import { IQuiz } from "@models/quiz.model";
import { createSelector, createFeatureSelector } from "@ngrx/store";
import QuizState from './quiz.state';

export const selectQuiz = createSelector(
  (state: QuizState) => state.Quiz,
  (quiz: IQuiz) => quiz
);

export const selectQuizState = createFeatureSelector<
  QuizState,
  IQuiz
>("Quiz");
