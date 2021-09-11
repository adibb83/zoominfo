import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { QuizService } from '@services/quiz.service';
import {
  GetQuestions,
  GetQuestionsSuccess,
  GetQuestionsFail,
} from '@store/quiz.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class QuestionsEffects {
  loadQuestion$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GetQuestions),
      mergeMap(() =>
        from(this.quizService.getQuizQuestions(10)).pipe(
          tap(() => console.log('Loading Questions...')),
          map((questions) => GetQuestionsSuccess({ questions: questions })),
          catchError((error) => of(GetQuestionsFail({ error: error }))),
          tap(() => console.log('Questions Effect Finished'))
        )
      )
    )
  );

  constructor(private actions$: Actions, private quizService: QuizService) {}
}
