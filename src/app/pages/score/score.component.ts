import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuiz } from '@models/quiz.model';
import { QuizService } from '@services/quiz/quiz.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit, OnDestroy {
  quizScore!: IQuiz;
  quizLoaderSub!: Subscription;

  constructor(
    private quizService: QuizService,
    private router: Router
  ) { }

  refreshQuiz() {
    this.router.navigate(['welcome'])
  }

  ngOnInit(): void {
    this.quizService.quizLoader$.subscribe(data => {
      if (data !== null) {
        this.quizScore = data;
      }
    })
  }

  ngOnDestroy() {
    if (this.quizLoaderSub) { this.quizLoaderSub.unsubscribe(); }
  }
}
