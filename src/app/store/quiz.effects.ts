import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { QuizService } from '@services/quiz.service';
import {
  GetQuestions,
  GetQuestionsSuccess,
  GetQuestionsFail,
} from '@store/quiz.actions';
import { Action } from '@ngrx/store';
import { SharedService } from '@services/shared.service';
import { LoggerService } from '@services/logger.service';

@Injectable()
export class QuestionsEffects {
  loadQuestion$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GetQuestions),
      mergeMap(() =>
        this.quizService.getQuizQuestions(10).pipe(
          tap(() => {
            this.loggerService.info('Loading Questions...');
          }),
          map((questions) => GetQuestionsSuccess({ questions: questions })),
          catchError((error) => of(GetQuestionsFail({ error: error }))),
          tap(() => {
            this.loggerService.info('Questions Effect Finished');
            this.sharedService.loader$.next(false);
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private quizService: QuizService,
    private sharedService: SharedService,
    private loggerService: LoggerService
  ) {}
}
