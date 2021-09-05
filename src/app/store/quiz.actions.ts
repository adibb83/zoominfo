import { createAction, props } from '@ngrx/store';
import { IQuiz, IQuestion, ITotal } from '@models/quiz.model';


export const GetQuizAction = createAction('[Quiz] - Get quiz');

export const CreateNewQuiz = createAction(
  '[Quiz] Init New Quiz',
  props<{ payload: IQuiz }>()
);

export const AddQuestionList = createAction(
  '[Quiz Question List] Retrieve Questions Success',
  props<{ payload: IQuiz }>()
);

export const retrievedQuestionListFailed = createAction(
  '[Quiz] - Error',
  props<{ error: Error }>()
);

export const QuestionWasAnswered = createAction(
  '[Quiz] Get AnswerScore',
  props<{ payload: IQuiz }>()
);

