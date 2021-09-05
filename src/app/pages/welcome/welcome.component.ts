import { Component, OnInit } from '@angular/core';
import { IQuiz } from '@models/quiz.model';
import { select, Store } from '@ngrx/store';
import QuizState from '@store/quiz.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  quiz$: Observable<QuizState>
  constructor(private store: Store<{ quiz: QuizState }>) {
    this.quiz$ = store.pipe(select('quiz'));
  }

  ngOnInit(): void {
    this.quiz$.subscribe(x => console.log(x));
  }

  startQuiz() {

  }
}
