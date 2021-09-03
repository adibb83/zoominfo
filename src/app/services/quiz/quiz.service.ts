import { Injectable, OnDestroy } from '@angular/core';
import { IQuestion } from '@models/quiz.model';
import { ApiClientService } from '@services/api-client/api-client.service';
import { Subscription, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService implements OnDestroy {

  private quizData: IQuestion[] = [];
  questionSubscription!: Subscription;

  get questionList$() {
    return this.quizData;
  }

  constructor(private apiClientService: ApiClientService) {
  }

  getQuestion() {
    this.questionSubscription = this.apiClientService.getQuestion().subscribe(res => {
      this.convertDataToQuestionModel(res.results[0]);
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
  }

  resetQuizData() {
    this.quizData = [];
    this.getQuestion();
  }

  ngOnDestroy() {
    if (this.questionSubscription) { this.questionSubscription.unsubscribe(); }
  }
}
