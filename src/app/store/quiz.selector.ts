
import { Injectable } from "@angular/core";
import { Action } from '@ngrx/store';
import * as QuizActions from '@store/quiz.actions'
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable } from "rxjs";
import { QuizService } from "@services/quiz/quiz.service";
import { map, mergeMap } from "rxjs/operators";


@Injectable()
export class QuizEffects {
  constructor(private action$: Actions, private quizService: QuizService) { }

  GetQuestions$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(QuizActions.BeginRetrievedQuestionList),
      mergeMap(async action => {
        this.quizService.getQuiz().then(res => {
          return QuizActions.SuccessRetrievedQuestionList({ payload: res });
        }),
          catchError((error: Error) => {
            return of(QuizActions.retrievedQuestionListFailed(error));
          })
      }
      )
    )
  )



}
