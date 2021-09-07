import { createAction, props } from '@ngrx/store';
import { IQuiz, IQuestion } from '@models/quiz.model';

export const GetQuiz = createAction(
  '[Welcome Component] - Init quiz',
  props<{ payload: IQuiz }>()
);

export const GetQuestions = createAction('[Client Api] - Get Questions');

export const GetQuestionsSuccess = createAction(
  '[Client Api] Get Question Success ',
  props<{ payload: IQuestion[] }>()
);

export const GetQuestionsFail = createAction(
  '[Client Api] Get Question Fail ',
  props<{ payload: Error }>()
);

export const GetCurrentQuestion = createAction(
  '[Quiz Component] Get Current Question',
  props<{ payload: IQuestion }>()
);

export const AnswerQuestionSuccess = createAction(
  '[Quiz Component] Answer Question Success'
);

export const AnswerQuestionFail = createAction(
  '[Quiz Component] Answer Question Fail'
);
