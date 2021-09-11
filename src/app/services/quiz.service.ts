import { Injectable } from '@angular/core';
import { IQuestion, IQuiz, QuestionResponse } from '@models/quiz.model';
import { ApiClientService } from '@services/api-client.service';
import { rejects } from 'assert';
import {
  BehaviorSubject,
  EMPTY,
  observable,
  Observable,
  of,
  throwError,
} from 'rxjs';
import {
  concatMap,
  expand,
  finalize,
  flatMap,
  last,
  map,
  mergeMap,
  reduce,
  take,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  questionId = 1;

  async getQuizQuestions(queNumber: number): Promise<IQuestion[]> {
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

  // for random correct answer location
  convertDataToQuestionModel(question: IQuestion): IQuestion {
    question.id = this.questionId;
    question.all_answers = [...question.incorrect_answers];
    question.all_answers.splice(Math.random() * 3, 0, question.correct_answer);
    this.questionId++;
    return question;
  }

  // ** for reference --  option number 2  (recursive)
  // for fetching api data and return array of questions -- not active
  getQuestionsOption2(queNumber: number) {
    let questionsList: IQuestion[] = [];
    this.apiClientService.getQuestion().pipe(
      expand((response) => {
        return response.results && response.results[0]
          ? this.apiClientService.getQuestion()
          : EMPTY;
      }),
      concatMap((z) => z.results),
      tap((x) => questionsList.push(x)),
      finalize(() => console.log(questionsList)),
      take(queNumber)
    );
  }

  constructor(private apiClientService: ApiClientService) {}
}
