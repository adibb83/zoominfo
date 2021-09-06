import { OnInit, Component, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { IQuiz } from '@models/quiz.model';
import { QuizService } from '@services/quiz.service';
import { ToastMassageService } from '@services/toast-massage.service';
import { Router } from '@angular/router';
import QuizState from '@store/quiz.state';
import { Store } from '@ngrx/store';
import * as QuizActions from '@store/quiz.actions'

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
  quiz!: IQuiz;
  pager = 'open';
  lockAnswers!: boolean;

  constructor(
    private quizService: QuizService,
    private toastMassage: ToastMassageService,
    private router: Router,
    private store: Store<{ quiz: QuizState }>
  ) { }

  ngOnInit() {
    this.quizLoaderSub = this.quizService.quizLoader$.subscribe((data: IQuiz | null) => {
      if (data !== null) {
        this.startQuiz(data);
      }
    });
  }

  startQuiz(quiz: IQuiz) {
    this.quiz = quiz
    this.lockAnswers = false;
    this.startTimer();
  }

  startTimer() {
    this.timer$ = this.reset$.pipe(
      startWith(0),
      switchMap(() => timer(1, 1000))
    );

    this.timerSub = this.timer$.subscribe((second) => {
      if (second > 20) {
        this.quiz.total.incorrect_answers++;
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
    this.quizService.quizLoader$.next(this.quiz);
    this.router.navigate(['score']);
    this.timerSub.unsubscribe();
  }

  nextQuestion() {
    this.lockAnswers = false;
    this.quiz.progress++;
    this.store.dispatch(QuizActions.QuestionWasAnswered({ payload: this.quiz }))
  }

  questionResult($event: boolean) {
    this.lockAnswers = true;
    this.addScoreToTotal($event);
    if (this.quiz.progress === this.quiz.questions.length - 1) {
      this.endGame();
      return;
    }
    setTimeout(() => {
      this.nextQuestion();
      this.refreshTimer();
    }, 300);
  }

  addScoreToTotal(isCorrect: boolean) {
    isCorrect
      ? this.quiz.total.correct_answers++
      : this.quiz.total.incorrect_answers++;
  }

  ngOnDestroy() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }

    if (this.quizLoaderSub) { this.quizLoaderSub.unsubscribe() }
  }
}
