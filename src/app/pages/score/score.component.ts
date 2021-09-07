import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAnswering, IQuiz } from '@models/quiz.model';
import { QuizService } from '@services/quiz.service';
import { StoreService } from '@services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit, OnDestroy {
  quizScore$ = this.storeService.quizScore;
  quizLoaderSub!: Subscription;

  constructor(private storeService: StoreService, private router: Router) {}

  refreshQuiz() {
    this.router.navigate(['welcome']);
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.quizLoaderSub) {
      this.quizLoaderSub.unsubscribe();
    }
  }
}
