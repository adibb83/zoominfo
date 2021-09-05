import { OnInit, Component, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { IQuiz } from '@models/quiz.model';
import { QuizService } from '@services/quiz/quiz.service';
import { ToastMassageService } from '@services/toast-message/toast-massage.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  responsiveOptions!: object[];
  currentQuestionIndex!: number;
  reset$ = new Subject();
  timer$!: Observable<any>;
  timerSub!: Subscription;
  quiz!: IQuiz;
  pager = 'open';
  lockAnswers!: boolean;

  get questionArrayLength() {
    return this.quiz.questions.length;
  }

  constructor(
    private quizService: QuizService,
    private toastMassage: ToastMassageService
  ) {
    this.setCarouselResponsiveMode();
    this.Init();
  }

  ngOnInit() { }

  Init() {
    this.quiz = {
      questions: this.quizService.questionList$,
      total: { correct_answers: 0, incorrect_answers: 0 },
    } as IQuiz;

    this.currentQuestionIndex = 0;
    this.lockAnswers = false;
  }

  startTimer() {
    if (this.quiz.questions.length === 0) { return; }
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

  refreshQuiz() {
    this.quizService.resetQuizData();
    this.Init();
  }

  refreshTimer(): void {
    this.reset$.next(void 0);
  }

  stopTimer() {
    this.timerSub.unsubscribe();
  }

  endGame() {
    this.setPager('end');
    this.timerSub.unsubscribe();
  }

  nextQuestion() {
    if (this.currentQuestionIndex === this.questionArrayLength - 1) {
      this.lockAnswers = true;
      this.endGame();
      return;
    }
    this.lockAnswers = false;
    this.currentQuestionIndex++;
  }

  questionResult($event: boolean) {
    this.lockAnswers = true;
    this.addScoreToTotal($event);
    setTimeout(() => {
      this.nextQuestion();
      this.refreshTimer();
    }, 500);
  }

  addScoreToTotal(isCorrect: boolean) {
    isCorrect
      ? this.quiz.total.correct_answers++
      : this.quiz.total.incorrect_answers++;
  }

  setPager(page: string) {
    switch (page) {
      case 'open':
        this.pager = page;
        break;
      case 'quiz':
        if (this.questionArrayLength === 0) {
          this.toastMassage.showError('Sorry But I Think I Said No Questions For NOW! didn`t I?')
          break;
        }
        this.Init();
        this.startTimer();
        this.pager = page;
        break;
      case 'end':
        this.pager = page;
        break;
    }
  }

  setCarouselResponsiveMode() {
  }

  ngOnDestroy() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }
}
