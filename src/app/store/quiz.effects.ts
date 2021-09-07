import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { QuizService } from '@services/quiz.service';
import {
  GetQuestions,
  GetQuestionsSuccess,
  GetQuestionsFail,
} from '@store/quiz.actions';

@Injectable()
export class QuestionsEffects {
  loadQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetQuestions),
      mergeMap(() =>
        from(this.quizService.getQuizQuestions()).pipe(
          tap((x) => console.log('loadQuestion', x)),
          map((questions) => GetQuestionsSuccess({ payload: questions })),
          catchError((error) => of(GetQuestionsFail({ payload: error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private quizService: QuizService) {}
}
