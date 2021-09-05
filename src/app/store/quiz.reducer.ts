import { createReducer, on, Action } from '@ngrx/store';
import { IQuiz, IQuestion } from '@models/quiz.model';
import * as QuizActions from '@store/quiz.actions'
import QuizState, { initializeState } from './quiz.state';


export const initialState = initializeState();;

const reducer = createReducer(
  initialState,
  on(QuizActions.AddQuestionList, (state: QuizState, { payload }) => {
    return { ...state, Quiz: payload };
  }),
  on(QuizActions.retrievedQuestionListFailed, (state: QuizState, { error: Error }) => {
    console.log(Error);
    return { ...state, QuizError: Error };
  }),
  on(QuizActions.QuestionWasAnswered, (state: QuizState, { payload }) => {
    return { ...state, Quiz: payload };
  })
);

export function QuizReducer(state: QuizState | undefined, action: Action) {
  return reducer(state, action);
}
