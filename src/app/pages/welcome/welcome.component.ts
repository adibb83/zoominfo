import { Component, OnInit } from '@angular/core';
import { IQuiz } from '@models/quiz.model';
import { select, Store } from '@ngrx/store';
import { QuizService } from '@services/quiz.service';
import QuizState from '@store/quiz.state';
import { selectQuiz, selectQuizState } from '@store/quiz.selector'

import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit(): void { }

  startQuiz() {
    this.router.navigate(['quiz'])
  }
}
