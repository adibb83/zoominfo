import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswersComponent } from '@components/answers/answers.component';
import { QuizComponent } from '@components/quiz/quiz.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [
    AnswersComponent,
    QuizComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    SharedModule
  ]
})

export class QuizModule { }
