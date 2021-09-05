import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { QuizService } from '@services/quiz/quiz.service';
import QuizState from '@store/quiz.state';
import * as QuizActions from '@store/quiz.actions'
import { Subscription } from 'rxjs';
import { IQuiz } from '@models/quiz.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  quizSub!: Subscription;
  quiz$ = this.store.pipe(select('quiz'));

  constructor(
    private store: Store<{ quiz: QuizState }>
    , private quizService: QuizService) {
  }

  ngOnInit() {
    this.quizSub = this.quiz$.subscribe(state => {
      if (state.Quiz !== null) {
        this.quizService.quizLoader$.next(JSON.parse(JSON.stringify(state.Quiz)))
      } else {
        this.initNewQuiz();
      }
    },
      (err) => err,
      () => this.quizSub.unsubscribe()
    );
  }


  initNewQuiz() {
    let quiz: IQuiz = this.quizService.initNewQuiz();
    this.quizService.getQuizQuestions().then(questions => {
      quiz.questions = questions;
      this.quizService.quizLoader$.next(quiz);
      this.store.dispatch(QuizActions.AddQuestionList({ payload: quiz }))
    })
  }

  ngOnDestroy() {
    if (this.quizSub) { this.quizSub.unsubscribe(); }
  }
}
