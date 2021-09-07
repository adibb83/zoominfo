import { createReducer, on, Action, State } from '@ngrx/store';
import { IQuiz, IQuestion } from '@models/quiz.model';
import * as QuizActions from '@store/quiz.actions';
import QuizState, { initializeState } from './quiz.state';

export const initialState = initializeState();

export const QuizReducer = createReducer(
  initialState,
  on(QuizActions.GetQuestions, (state) => ({
    ...state,
  })),
  on(QuizActions.GetCurrentQuestion, (state, { payload }) => ({
    ...state,
    currentQuestion: payload,
  })),
  on(QuizActions.AnswerQuestionSuccess, (state) => ({
    ...state,
    correct_answers: state.quiz.answers.correct_answers + 1,
  })),
  on(QuizActions.AnswerQuestionFail, (state) => ({
    ...state,
    incorrect_answers: state.quiz.answers.incorrect_answers + 1,
  }))
);
