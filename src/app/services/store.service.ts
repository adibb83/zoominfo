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
  get getQuiz(): Observable<IQuiz> {
    return this.store.select(QuizSelectors.selectQuiz);
  }

  get getQuestions(): Observable<IQuestion[]> {
    return this.store.select(QuizSelectors.selectQuestions);
  }

  get currentQuestion(): Observable<IQuestion> {
    return this.store.select(QuizSelectors.selectCurrentQuestion);
  }

  get quizScore(): Observable<IAnswering> {
    return this.store.select(QuizSelectors.selectAnswers);
  }

  get quizStatus(): Observable<boolean> {
    return this.store.select(QuizSelectors.selectQuizStatus);
  }

  getQuestionsFromApi() {
    this.store.dispatch(QuizActions.GetQuestions());
  }

  setCurrentQuestion(question: IQuestion) {
    this.store.dispatch(QuizActions.GetCurrentQuestion({ question: question }));
  }

  setAnswerScore(answer: boolean) {
    answer
      ? this.store.dispatch(QuizActions.AnswerQuestionSuccess())
      : this.store.dispatch(QuizActions.AnswerQuestionFail());
  }

  endGame() {
    this.store.dispatch(
      QuizActions.EndGame({
        end: true,
      })
    );
  }

  startNewQuiz() {
    this.store.dispatch(QuizActions.RestartNewQuiz());
    this.getQuestionsFromApi();
  }

  constructor(private store: Store) {}
}
