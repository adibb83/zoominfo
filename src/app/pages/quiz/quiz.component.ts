import { OnInit, Component, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { IQuiz, IQuestion, ITotal } from '@models/quiz.model';
import { QuizService } from '@services/quiz/quiz.service';

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

  constructor(private quizService: QuizService) {
    this.setCarouselResponsiveMode();
  }

  ngOnInit() {}

  Init() {
    this.quiz = {
      questions: this.quizService.questionList$,
      total: { correct_answers: 0, incorrect_answers: 0 },
    } as IQuiz;

    this.currentQuestionIndex = 0;
    this.lockAnswers = false;
  }

  startTimer() {
    this.timer$ = this.reset$.pipe(
      startWith(0),
      switchMap(() => timer(1, 1000))
    );

    this.timerSub = this.timer$.subscribe((second) => {
      if (this.quiz.questions.length < 10) {
        this.quizService.getQuestion();
      }

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
    if (this.currentQuestionIndex === this.quiz.questions.length - 1) {
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
    if (page === 'quiz') {
      this.Init();
      this.startTimer();
    }
    this.pager = page;
  }

  setCarouselResponsiveMode() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnDestroy() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }
}
