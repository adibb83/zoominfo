import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '@services/shared.service';
import { StoreService } from '@services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnDestroy {
  quizScore$ = this.storeService.quizScore;
  quizLoaderSub!: Subscription;

  refreshQuiz() {
    this.sharedService.loader$.next(true);
    this.storeService.startNewQuiz();
    this.router.navigate(['welcome']);
  }

  constructor(
    private storeService: StoreService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnDestroy() {
    if (this.quizLoaderSub) {
      this.quizLoaderSub.unsubscribe();
    }
  }
}
