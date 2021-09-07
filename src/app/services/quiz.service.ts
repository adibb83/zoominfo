import { Injectable, OnDestroy } from '@angular/core';
import { IQuestion, IQuiz, QuestionResponse } from '@models/quiz.model';
import { ApiClientService } from '@services/api-client.service';
import { ToastMassageService } from '@services/toast-massage.service';
import {
  BehaviorSubject,
  forkJoin,
  interval,
  Observable,
  Subscription,
} from 'rxjs';
import { concatMap, map, mergeMap, takeWhile } from 'rxjs/operators';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService implements OnDestroy {
  quizLoader$ = new BehaviorSubject<IQuiz | null>(null);
  public quizDataListener$!: Observable<QuestionResponse>;
  questionSubscription!: Subscription;
  questionId = 1;

  constructor(
    private apiClientService: ApiClientService,
    private toastMassage: ToastMassageService,
    private logger: LoggerService
  ) {}

  initNewQuiz(): IQuiz {
    return {
      questions: null,
      answers: { correct_answers: 0, incorrect_answers: 0 },
      currentQuestion: null,
    } as IQuiz;
  }

  async getQuizQuestions(): Promise<IQuestion[]> {
    let promises = [];
    for (let index = 0; index < 10; index++) {
      promises.push(this.apiClientService.getQuestion().toPromise());
    }
    const questions = (await Promise.all(promises)).map((question) => {
      return this.convertDataToQuestionModel(question.results[0]);
    });

    return questions;
  }

  // for random correct answer location
  convertDataToQuestionModel(question: IQuestion): IQuestion {
    question.id = this.questionId;
    question.all_answers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ];
    this.questionId++;
    return question;
  }

  getQuestion(): Observable<IQuestion[]> {
    let Test: Observable<IQuestion[]>;
    return Test;
  }

  stopQuizDataListener() {
    if (this.questionSubscription) {
      this.questionSubscription.unsubscribe();
    }
  }

  resetQuizData() {}

  ngOnDestroy() {
    if (this.questionSubscription) {
      this.questionSubscription.unsubscribe();
    }
  }
}
