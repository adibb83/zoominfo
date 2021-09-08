import { OnInit, Component, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { switchMap, startWith, delay } from 'rxjs/operators';
import { IQuestion } from '@models/quiz.model';
import { Router } from '@angular/router';
import { StoreService } from '@services/store.service';
import { SharedService } from '@services/shared.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  reset$ = new Subject();
  timer$!: Observable<any>;
  timerSub!: Subscription;
  quizLoaderSub!: Subscription;
  questions$ = this.storeService.GetQuestions;
  questions: IQuestion[] = [];
  currentQuestionIndex = 0;
  lockAnswers!: boolean;

  startQuiz(questions: IQuestion[]) {
    this.sharedService.loader$.next(false);
    this.questions = questions;
    this.storeService.setCurrentQuestion(
      this.questions[this.currentQuestionIndex]
    );
    this.startTimer();
    this.lockAnswers = false;
  }

  nextQuestion() {
    this.lockAnswers = false;
    this.storeService.setCurrentQuestion(
      this.questions[this.currentQuestionIndex++]
    );
  }

  questionResult($event: boolean) {
    this.lockAnswers = true;
    this.addScoreToTotal($event);
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.endGame();
      return;
    }
    setTimeout(() => {
      this.nextQuestion();
      this.refreshTimer();
    }, 300);
  }

  addScoreToTotal(isCorrect: boolean) {
    this.storeService.setAnswerScore(isCorrect);
  }

  startTimer() {
    this.timer$ = this.reset$.pipe(
      startWith(0),
      switchMap(() => timer(1, 1000))
    );

    this.timerSub = this.timer$.subscribe((second) => {
      if (second > 20) {
        this.addScoreToTotal(false);
        this.nextQuestion();
        this.refreshTimer();
      }
    });
  }

  refreshTimer(): void {
    this.reset$.next(void 0);
  }

  stopTimer() {
    this.timerSub.unsubscribe();
  }

  endGame() {
    this.timerSub.unsubscribe();
    this.storeService.endGame();
    this.currentQuestionIndex = 0;
    this.router.navigate(['score']);
  }

  constructor(
    private router: Router,
    private storeService: StoreService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.questions$.pipe(delay(0)).subscribe((que) => {
      this.sharedService.loader$.next(true);
      if (que.length > 0) {
        this.startQuiz(que);
      }
    });
  }

  ngOnDestroy() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }

    if (this.quizLoaderSub) {
      this.quizLoaderSub.unsubscribe();
    }
  }
}
