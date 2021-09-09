import { Injectable } from '@angular/core';
import { IQuestion, IQuiz, QuestionResponse } from '@models/quiz.model';
import { ApiClientService } from '@services/api-client.service';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class QuizService {

  quizLoader$ = new BehaviorSubject<IQuiz | null>(null);
  public quizDataListener$!: Observable<QuestionResponse>;
  questionId = 1;


  async getQuizQuestions(): Promise<IQuestion[]> {
    let promises = [];
    for (let index = 0; index < 10; index++) {
      promises.push(this.apiClientService.getQuestion().toPromise());
    }
    const questions = (await Promise.all(promises)).map((question) => {
      return this.convertDataToQuestionModel(question.results[0]);
    });
    this.questionId = 1;
    return questions;
  }

  // for random correct answer location
  convertDataToQuestionModel(question: IQuestion): IQuestion {
    question.id = this.questionId;
    question.all_answers = [...question.incorrect_answers];
    question.all_answers.splice((Math.random() * 3), 0, question.correct_answer)
    this.questionId++;
    return question;
  }

  constructor(
    private apiClientService: ApiClientService,
  ) { }

}
