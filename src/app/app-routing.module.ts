import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from '@pages/quiz/quiz.component';
import { ScoreComponent } from '@pages/score/score.component';
import { WelcomeComponent } from '@pages/welcome/welcome.component';
import { ScoreRouteGuardService } from '@services/score.guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'quiz',
    component: QuizComponent
  },
  {
    path: 'score',
    component: ScoreComponent,
    canActivate: [ScoreRouteGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
