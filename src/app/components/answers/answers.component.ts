import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQuestion } from '@models/quiz.model';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent implements OnInit {
  @Input() question!: IQuestion;
  @Output() questionResult = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onAnswer(answer: string) {
    if (this.question.correct_answer === answer) {
      this.questionResult.emit(true);
    } else {
      this.question.incorrect_count++;
    }

    if (this.question.incorrect_count === 3) {
      this.questionResult.emit(false);
    }
  }
}
