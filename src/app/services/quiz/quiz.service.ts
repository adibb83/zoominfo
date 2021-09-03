import { Injectable, OnDestroy } from '@angular/core';
import { IQuestion } from '@models/quiz.model';
import { ApiClientService } from '@services/api-client/api-client.service';
import { BehaviorSubject, Subscription, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService implements OnDestroy {
  private quizData: IQuestion[] = [];
  private questionList = new BehaviorSubject<IQuestion[]>(this.quizData);
  questionSubscription!: Subscription;

  get questionList$() {
    return this.questionList.asObservable();
  }

  constructor(private apiClientService: ApiClientService) {
    this.getQuestion();
  }

  getQuestion() {
    this.questionSubscription = this.apiClientService.getQuestion().subscribe(res =>
      this.convertDataToQuestionModel(res.results),
      (err) => throwError(err),
      () => this.questionSubscription.unsubscribe()
    );
  }

  // for random correct answer location
  convertDataToQuestionModel(question: IQuestion) {
    question.all_answers = question.incorrect_answers;
    question.all_answers.splice(Math.floor(Math.random() * 3), 0, question.correct_answer);
    this.quizData.push(question);
    this.questionList.next(this.quizData);
  }

  ngOnDestroy() {
    if (this.questionSubscription) { this.questionSubscription.unsubscribe(); }
  }
}
