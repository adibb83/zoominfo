import { OnInit, Component, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { IQuestion } from '@models/quiz.model';
import { QuizService } from '@services/quiz.service';
import { ToastMassageService } from '@services/toast-massage.service';
import { Router } from '@angular/router';
import { StoreService } from '@services/store.service';

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

  constructor(
    private quizService: QuizService,
    private toastMassage: ToastMassageService,
    private router: Router,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.questions$.subscribe((que) => {
      console.log(que);
      if (que.length > 0) {
        this.startQuiz(que);
      }
    });
  }

  startQuiz(questions: IQuestion[]) {
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
    this.storeService.setAnawerScore(isCorrect);
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
    this.router.navigate(['score']);
    this.timerSub.unsubscribe();
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
