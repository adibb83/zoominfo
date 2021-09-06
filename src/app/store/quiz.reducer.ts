import { createReducer, on, Action, createSelector, State } from '@ngrx/store';
import { IQuiz, IQuestion } from '@models/quiz.model';
import * as QuizActions from '@store/quiz.actions'
import QuizState, { initializeState } from './quiz.state';


export const initialState = initializeState();;

export function reducer(state = initialState, action: QuizActions.Actions): State {
  switch (action.type) {
    case QuizActions.GetQuiz: {
      return {
        ...state,
        loading: true,
        answers: [],
        progress: 0,
      };
    }
    case QuizActions.GetQuizSuccess: {
      return {
        ...state,
        loading: false,
        isFinised: false,
        quiz: action.payload,
        questionQueue: action.payload.questions
      };
    }

    case QuizActions.GetQuestion: {
      return {
        ...state
      };
    }
    case QuizActions.GetQuestionSuccess: {
      return {
        ...state,
        currentQuestion: action.payload, // first question in the queue
        questionQueue: state.questionQueue.filter((item, index) => index > 0), // removing first element in the queue
        progress: ++state.progress
      };
    }
    case QuizActions.AnswerQuestion: {
      return {
        ...state,
        loading: true
      };
    }
    case QuizActions.AnswerSuccess: {
      return {
        ...state,
        loading: false,
        answers: [...state.answers, action.payload],
        progress: [...state.answers, action.payload].length
      };
    }
    case QuizActions.AnswerFail: {
      return {
        ...state,
        loading: false,
        questionQueue: [...state.questionQueue, state.currentQuestion],
      };
    }
    case QuizActions.GetScore: {
      return {
        ...state,
        loading: false,
        questionQueue: [],
        currentQuestion: null,
        isFinised: true,
        answers: state.answers.sort((a, b) => a.questionId - b.questionId) // sorting answers before showing score
      };
    }
    default: {
      return state;
    }
  }
}

export const selectQuizState = (state: AppState) => state.app;
export const selectQuestion = createSelector(
  selectQuizState,
  (state: State) => state.currentQuestion
);

export const selectQuizStatus = createSelector(
  selectQuizState,
  (state: State) => state.isFinised
);

export const selectQuizProgress = createSelector(
  selectQuizState,
  (state: State) => state.quiz ? state.quiz.questions ? `${state.progress}/${state.quiz.questions.length}` : null : null
);

export const selectScoreDetails = createSelector(
  selectQuizState, (state: State) => state.answers
);

export const selectScore = createSelector(
  selectQuizState, (state: State) => state.answers.map(answer => answer.answerIndex)
    .filter(index => index === 0).length
);
