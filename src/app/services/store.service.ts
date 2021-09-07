import { Injectable } from '@angular/core';
import { IAnswering, IQuestion, IQuiz } from '@models/quiz.model';
import { Store } from '@ngrx/store';
import * as QuizActions from '@store/quiz.actions';
import * as QuizSelectors from '@store/quiz.selector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private store: Store) {}

  get GetQuiz(): Observable<IQuiz> {
    return this.store.select(QuizSelectors.selectQuiz);
  }

  get GetQuestions(): Observable<IQuestion[]> {
    return this.store.select(QuizSelectors.selectQuestions);
  }

  getApiQuestions() {
    this.store.dispatch(QuizActions.GetQuestions());
  }

  setCurrentQuestion(question: IQuestion) {
    this.store.dispatch(QuizActions.GetCurrentQuestion({ payload: question }));
  }

  get currentQuestion(): Observable<IQuestion> {
    return this.store.select(QuizSelectors.selectCurrentQuestion);
  }

  setAnawerScore(answer: boolean) {
    answer
      ? this.store.dispatch(QuizActions.AnswerQuestionSuccess())
      : this.store.dispatch(QuizActions.AnswerQuestionFail());
  }

  get quizScore(): Observable<IAnswering> {
    return this.store.select(QuizSelectors.selectAnswers);
  }
}
