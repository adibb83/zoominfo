import { createAction, props } from '@ngrx/store';
import { IQuiz, IQuestion, IAnswering } from '@models/quiz.model';


export const GetQuiz = createAction('[GET_QUIZ] - Get quiz');

export const GetQuizSuccess = createAction(
  '[GET_QUIZ_SUCCESS]',
  props<{ payload: IQuiz }>()
)
export const GetQuizFail = createAction('[GET_QUIZ_FAIL] - Get quiz fail');

export const GetQuestion = createAction('[GET_QUESTION] - Get Question');

export const GetQuestionSuccess = createAction(
  '[GET_QUIZ_SUCCESS] Get Question Success ',
  props<{ payload: IQuestion }>()
)

export const GetQuestionFail = createAction(
  '[GET_QUESTION_FAIL] Get Question Fail ',
  props<{ payload: Boolean }>()
)

export const AnswerQuestion = createAction(
  '[ANSWER_QUESTION] Answer Question',
  props<{ payload: IAnswering }>()
)

export const AnswerSuccess = createAction(
  '[ANSWER_SUCCESS] Answer Success',
  props<{ payload: IAnswering }>()
)

export const AnswerFail = createAction(
  '[ANSWER_FAIL] - Answer Fail',
  props<{ payload: IAnswering }>()
);

export const GetScore = createAction('[GET_SCORE] - Get Score');
