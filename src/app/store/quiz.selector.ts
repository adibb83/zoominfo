
import { Injectable } from "@angular/core";
import { Action } from '@ngrx/store';
import * as QuizActions from '@store/quiz.actions'
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from "rxjs";
import { QuizService } from "@services/quiz/quiz.service";
import { catchError, map, mergeMap } from "rxjs/operators";


@Injectable()
export class QuizEffects {
  constructor(private action$: Actions, private quizService: QuizService) { }


  CreateNewQuiz$: Observable<Action> = createEffect(() => {
    return this.action$.pipe(
      ofType(QuizActions.CreateNewQuiz),
      map(() => {
        this.quizService.quiz = this.quizService.initNewQuiz();
        return QuizActions.CreateNewQuiz({ payload: this.quizService.quiz })
      }),
      catchError((error: Error) => {
        return of(QuizActions.retrievedQuestionListFailed({ error }));
      })
    )
  })


  GetQuestions$: Observable<Action> = createEffect(() => {
    return this.action$.pipe(
      ofType(QuizActions.BeginRetrievedQuestionList),
      mergeMap(() => {
        return from(this.quizService.getQuiz()).pipe(map(res => {
          this.quizService.quiz.questions = res;
          return QuizActions.SuccessRetrievedQuestionList({ payload: this.quizService.quiz });
        }));
      }),
      catchError((error: Error) => {
        return of(QuizActions.retrievedQuestionListFailed({ error }));
      })
    );
  });



}
