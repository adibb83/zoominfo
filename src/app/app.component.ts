import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { QuizService } from '@services/quiz.service';
import QuizState from '@store/quiz.state';
import * as QuizActions from '@store/quiz.actions';
import { Subscription } from 'rxjs';
import { IQuiz } from '@models/quiz.model';
import * as selectors from '@store/quiz.selector';
import { StoreService } from '@services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  quizSub!: Subscription;
  quiz$ = this.storeService.GetQuiz;
  CurrentQuestion$ = this.storeService.currentQuestion;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.quizSub = this.quiz$.subscribe(
      (state) => {
        console.log(state);
      },
      (err) => err,
      () => this.quizSub.unsubscribe()
    );

    this.storeService.getApiQuestions();
  }

  ngOnDestroy() {
    if (this.quizSub) {
      this.quizSub.unsubscribe();
    }
  }
}
