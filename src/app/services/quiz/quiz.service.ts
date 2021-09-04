import { Injectable, OnDestroy } from '@angular/core';
import { IQuestion, QuestionResponse } from '@models/quiz.model';
import { ApiClientService } from '@services/api-client/api-client.service';
import { ToastMassageService } from '@services/toast-message/toast-massage.service';
import { Observable, Subscription, throwError, timer } from 'rxjs';
import { retry, share, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService implements OnDestroy {

  private quizData: IQuestion[] = [];
  public quizDataListener$!: Observable<QuestionResponse>;
  questionSubscription!: Subscription;


  get questionList$() {
    return this.quizData;
  }

  constructor(
    private apiClientService: ApiClientService,
    private toastMassage: ToastMassageService) {
  }

  initData() {
    this.quizDataListener$ = timer(1, 1500).pipe(
      switchMap(() => this.apiClientService.getQuestion()),
      retry(1),
      share()
    );
  }

  getQuestions() {
    this.questionSubscription = this.quizDataListener$.subscribe(res => {
      if (res.results.length > 0) {
        this.convertDataToQuestionModel(res.results[0]);
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
    question.all_answers = question.incorrect_answers;
    question.all_answers.splice(Math.floor(Math.random() * 3), 0, question.correct_answer);
    question.incorrect_count = 0;
    this.quizData.push(question);
    if (this.quizData.length === 10) { this.stopQuizDataListener() }
  }

  stopQuizDataListener() {
    if (this.questionSubscription) { this.questionSubscription.unsubscribe(); }
  }

  resetQuizData() {
    this.quizData = [];
    this.getQuestions();
  }

  ngOnDestroy() {
    if (this.questionSubscription) { this.questionSubscription.unsubscribe(); }
  }
}
