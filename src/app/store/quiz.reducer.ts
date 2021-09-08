import { createReducer, on } from '@ngrx/store';
import * as QuizActions from '@store/quiz.actions';
import { initializeState } from './quiz.state';

export const QuizReducer = createReducer(
  initializeState,
  on(QuizActions.GetQuestionsSuccess, (state, action) => ({
    ...state,
    quiz: {
      ...state.quiz,
      questions: action.questions,
    },
  })),

  on(QuizActions.GetCurrentQuestion, (state, action) => ({
    ...state,
    quiz: {
      ...state.quiz,
      currentQuestion: action.question,
    },
  })),

  on(QuizActions.AnswerQuestionSuccess, (state) => ({
    ...state,
    quiz: {
      ...state.quiz,
      answers: {
        ...state.quiz.answers,
        correct_answers: state.quiz.answers.correct_answers + 1,
      },
    },
  })),

  on(QuizActions.AnswerQuestionFail, (state) => ({
    ...state,
    quiz: {
      ...state.quiz,
      answers: {
        ...state.quiz.answers,
        incorrect_answers: state.quiz.answers.incorrect_answers + 1,
      },
    },
  })),

  on(QuizActions.EndGame, (state, action) => ({
    ...state,
    quiz: {
      ...state.quiz,
      isFinished: action.end
    }
  })),

  on(QuizActions.RestartNewQuiz, (state, action) => ({
    ...state,
    quiz: action.quiz
  })),
);
