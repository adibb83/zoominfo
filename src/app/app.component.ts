import { Component, OnInit } from '@angular/core';
import { QuizService } from '@services/quiz/quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Quiz';

  constructor(private quizService: QuizService) {

  }

  ngOnInit() {
    this.quizService.getQuestion();
  }
}
