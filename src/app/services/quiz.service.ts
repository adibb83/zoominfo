import { Injectable } from '@angular/core';
import { IQuestion } from '@models/quiz.model';
import { ApiClientService } from '@services/api-client.service';
import { EMPTY, Observable } from 'rxjs';
import {
  concatAll,
  concatMap,
  expand,
  finalize,
  reduce,
  take,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  questionId = 1;

  getQuizQuestions(queNumber: number): Observable<IQuestion[]> {
    return this.apiClientService.getQuestion().pipe(
      expand((response) => {
        return response.results && response.results[0]
          ? this.apiClientService.getQuestion()
          : EMPTY;
      }),
      take(queNumber),
      reduce((acc, val) => {
        acc.push(this.convertDataToQuestionModel(val.results[0]));
        return acc;
      }, [])
    );
  }

  // for random correct answer location
  convertDataToQuestionModel(question: IQuestion): IQuestion {
    question.id = this.questionId;
    question.all_answers = [...question.incorrect_answers];
    question.all_answers.splice(Math.random() * 3, 0, question.correct_answer);
    this.questionId++;
    return question;
  }

  // ** for reference --  option number 2  (async)
  // for fetching api data and return array of questions -- not active
  async getQuizQuestionOption2(queNumber: number): Promise<IQuestion[]> {
    let promises = [];
    for (let index = 0; index < queNumber; index++) {
      promises.push(this.apiClientService.getQuestion().toPromise());
    }

    const questions = (await Promise.all(promises)).map((question) => {
      return this.convertDataToQuestionModel(question.results[0]);
    });
    this.questionId = 1;
    return questions;
  }

  constructor(private apiClientService: ApiClientService) {}
}
