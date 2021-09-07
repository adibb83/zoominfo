import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQuestion } from '@models/quiz.model';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent {
  @Input() question!: IQuestion;
  @Output() questionResult = new EventEmitter<boolean>();
  private incorrect_count = 0;

  onAnswer(answer: string) {
    if (this.question.correct_answer === answer) {
      this.questionResult.emit(true);
    } else {
      this.incorrect_count++;
    }

    if (this.incorrect_count === 3) {
      this.questionResult.emit(false);
    }
  }
}
