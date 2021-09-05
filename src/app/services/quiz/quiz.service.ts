import { Injectable, OnDestroy } from '@angular/core';
import { IQuestion, IQuiz, QuestionResponse } from '@models/quiz.model';
import { ApiClientService } from '@services/api-client/api-client.service';
import { ToastMassageService } from '@services/toast-message/toast-massage.service';
import { Observable, Subscription, throwError, timer } from 'rxjs';
import { retry, share, switchMap, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService implements OnDestroy {
  private quizData: IQuestion[] = [];
  public quiz!: IQuiz;
  public quizDataListener$!: Observable<QuestionResponse>;
  questionSubscription!: Subscription;
  questionId = 1;


  get questionList$() {
    return this.quizData;
  }

  constructor(
    private apiClientService: ApiClientService,
    private toastMassage: ToastMassageService) {
  }

  initNewQuiz(): IQuiz {
    return {
      questions: null,
      total: { correct_answers: 0, incorrect_answers: 0 },
      progress: 1
    } as IQuiz;
  }

  initData() {
    this.quizDataListener$ = timer(1, 1500).pipe(
      switchMap(() => this.apiClientService.getQuestion()),
      retry(1),
      share()
    );
  }

  async getQuiz(): Promise<IQuestion[]> {
    let promises = []
    for (let index = 0; index < 10; index++) {
      promises.push(this.apiClientService.getQuestion().toPromise());
    }

    const questions = (await Promise.all(promises)).map(question => {
      return this.convertData(question.results[0])
    });

    return questions;
  }

  convertData(question: IQuestion): IQuestion {
    question.id = this.questionId;
    question.all_answers = question.incorrect_answers;
    question.all_answers.splice(Math.floor(Math.random() * 3), 0, question.correct_answer);
    question.incorrect_count = 0;
    this.questionId++;
    return question;
  }


  getQuestions() {
    this.questionSubscription = this.quizDataListener$.subscribe(res => {
      if (res.results.length > 0) {
        this.convertDataToQuestionModel(res.results[0])
      } else {
        this.toastMassage.showError('Oops No Questions For Now. Try Later');
        this.stopQuizDataListener();
      }
    },
      (err) => throwError(err),
      () => this.questionSubscription.unsubscribe()
    );
  }

  // for random correct answer location
  convertDataToQuestionModel(question: IQuestion) {
    question.id = this.questionId;
    question.all_answers = question.incorrect_answers;
    question.all_answers.splice(Math.floor(Math.random() * 3), 0, question.correct_answer);
    question.incorrect_count = 0;
    this.quizData.push(question);
    this.questionId++;
    if (this.quizData.length === 10) { this.stopQuizDataListener() }
  }

  stopQuizDataListener() {
    if (this.questionSubscription) { this.questionSubscription.unsubscribe(); }
  }

  resetQuizData() {
    this.questionId = 1;
    this.quizData = [];
    this.getQuestions();
  }

  ngOnDestroy() {
    if (this.questionSubscription) { this.questionSubscription.unsubscribe(); }
  }
}
