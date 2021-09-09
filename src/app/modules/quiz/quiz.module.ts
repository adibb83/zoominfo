import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswersComponent } from '@components/answers/answers.component';
import { QuizComponent } from '@components/quiz/quiz.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { SharedModule } from 'primeng/api';
import { PrimeNGModule } from '@modules/prime-ng/prime-ng.module';

// pipe
import { code64Pipe } from '@pipes/code64.pipe';
// directives
import { ButtonAnimationDirective } from '@directives/button-animation.directive';

@NgModule({
  declarations: [
    AnswersComponent,
    QuizComponent,
    code64Pipe,
    ButtonAnimationDirective
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    PrimeNGModule,
    SharedModule,
  ]
})

export class QuizModule { }
