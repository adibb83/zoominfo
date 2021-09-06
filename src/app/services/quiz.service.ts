import { Injectable, OnDestroy } from '@angular/core';
import { IQuestion, IQuiz, QuestionResponse } from '@models/quiz.model';
import { ApiClientService } from '@services/api-client.service';
import { ToastMassageService } from '@services/toast-massage.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuizService implements OnDestroy {
  quizLoader$ = new BehaviorSubject<IQuiz | null>(null);
  public quizDataListener$!: Observable<QuestionResponse>;
  questionSubscription!: Subscription;
  questionId = 1;


  constructor(
    private apiClientService: ApiClientService,
    private toastMassage: ToastMassageService) {
  }

  initNewQuiz(): IQuiz {
    return {
      questions: null,
      total: { correct_answers: 0, incorrect_answers: 0 },
      progress: 0
    } as IQuiz;
  }

  async getQuizQuestions(): Promise<IQuestion[]> {
    let promises = []
    for (let index = 0; index < 10; index++) {
      promises.push(this.apiClientService.getQuestion().toPromise());
    }

    const questions = (await Promise.all(promises)).map(question => {
      return this.convertDataToQuestionModel(question.results[0])
    });

    return questions;
  }

  // for random correct answer location
  convertDataToQuestionModel(question: IQuestion): IQuestion {
    question.id = this.questionId;
    question.all_answers = question.incorrect_answers;
    question.all_answers.splice(Math.floor(Math.random() * 3), 0, question.correct_answer);
    question.incorrect_count = 0;
    this.questionId++;
    return question;
  }

  stopQuizDataListener() {
    if (this.questionSubscription) { this.questionSubscription.unsubscribe(); }
  }

  resetQuizData() {

  }

  ngOnDestroy() {
    if (this.questionSubscription) { this.questionSubscription.unsubscribe(); }
  }
}
