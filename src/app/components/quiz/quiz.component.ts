import { OnInit, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, timer } from 'rxjs';
import { switchMap, startWith, delay, takeUntil } from 'rxjs/operators';
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
  questions$ = this.storeService.getQuestions;
  questions: IQuestion[] = [];
  currentQuestionIndex = 0;
  notifier = new Subject()
  lockAnswers = new BehaviorSubject<boolean>(false);

  startQuiz(questions: IQuestion[]) {
    this.sharedService.loader$.next(false);
    this.questions = questions;
    this.storeService.setCurrentQuestion(
      this.questions[this.currentQuestionIndex]
    );
    this.startTimer();
  }

  nextQuestion() {
    this.lockAnswers.next(false);
    this.storeService.setCurrentQuestion(
      this.questions[this.currentQuestionIndex++]
    );
  }

  questionResult($event: boolean) {
    this.lockAnswers.next(true);
    this.addScoreToTotal($event);
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.endGame();
      return;
    }

    // for animation effect
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
      switchMap(() => timer(1, 1000)),
      takeUntil(this.notifier)
    );

    this.timerSub = this.timer$.subscribe((second) => {
      if (second > 20) {
        this.questionResult(false);
      }
    });
  }

  refreshTimer() {
    this.reset$.next(void 0);
  }

  stopTimer() {
    this.notifier.next();
    this.timerSub.unsubscribe();
  }

  endGame() {
    this.stopTimer();
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
    this.notifier.next();
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }

    if (this.quizLoaderSub) {
      this.quizLoaderSub.unsubscribe();
    }
  }
}
