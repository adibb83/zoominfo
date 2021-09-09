import { createAction, props } from '@ngrx/store';
import { IQuiz, IQuestion } from '@models/quiz.model';

export const GetQuestions = createAction('[Client Api] - Get Questions');

export const GetQuestionsSuccess = createAction(
  '[Client Api] Get Question Success ',
  props<{ questions: IQuestion[] }>()
);

export const GetQuestionsFail = createAction(
  '[Client Api] Get Question Fail ',
  props<{ error: Error }>()
);

export const GetCurrentQuestion = createAction(
  '[Quiz Component] Get Current Question',
  props<{ question: IQuestion }>()
);

export const AnswerQuestionSuccess = createAction(
  '[Quiz Component] Answer Question Success'
);

export const AnswerQuestionFail = createAction(
  '[Quiz Component] Answer Question Fail'
);

export const EndGame = createAction(
  '[Quiz Component] - End Game',
  props<{ end: boolean }>()
);

export const RestartNewQuiz = createAction(
  '[Score Component] - Init New Quiz'
);
