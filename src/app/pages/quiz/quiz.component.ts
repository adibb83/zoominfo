import { OnInit, Component, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import {
  switchMap,
  startWith
} from 'rxjs/operators';
import { IQuiz, IQuestion, ITotal } from '@models/quiz.model';
import { QuizService } from '@services/quiz/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {

  responsiveOptions!: object[];
  currentQuestionIndex = 0;
  reset$ = new Subject();
  timer$!: Observable<any>;
  timerSub!: Subscription;
  quiz!: IQuiz;
  pager = 'open'
  lockAnswers = false;

  constructor(private quizService: QuizService) {
    this.setCarouselResponsiveMode();
    this.Init();
  }

  ngOnInit() {

  }


  Init() {
    this.quiz = {
      questions: this.quizService.questionList$,
      total: { correct_answers: 0, incorrect_answers: 0 }
    } as IQuiz

    this.startTimer();
  }


  startTimer() {
    this.timer$ = this.reset$.pipe(
      startWith(0),
      switchMap(() => timer(1, 1000))
    );

    this.timerSub = this.timer$.subscribe((second) => {
      if (this.quiz.questions.length < 10) { this.quizService.getQuestion(); }
      if (second > 20) {
        this.quiz.total.incorrect_answers++;
        this.nextQuestion();
        this.refreshTimer();
      }
    });
  }

  refreshQuiz() {
    this.quizService.resetQuizData();
    this.Init()
  }

  refreshTimer(): void {
    this.reset$.next(void 0);
  }

  endGame() {
    this.timerSub.unsubscribe();
    this.setPager('end');
  }

  nextQuestion() {
    if (this.currentQuestionIndex > 9) {
      this.lockAnswers = true;
      this.endGame();
      return;
    }
    this.lockAnswers = false;
    this.currentQuestionIndex++;
  }

  questionResult($event: boolean) {
    this.lockAnswers = true;
    console.log($event);
    this.addScoreToTotal($event);
    setTimeout(() => {
      this.nextQuestion();
      this.refreshTimer();
    }, 500);

  }

  addScoreToTotal(isCorrect: boolean) {
    isCorrect ? this.quiz.total.correct_answers++ : this.quiz.total.incorrect_answers++;
  }

  setPager(page: string) {
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
    if (this.timerSub) { this.timerSub.unsubscribe(); }
  }
}
