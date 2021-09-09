import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from '@components/quiz/quiz.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule { }
