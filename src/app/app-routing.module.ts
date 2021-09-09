import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from '@components/quiz/quiz.component';
import { ScoreComponent } from '@components/score/score.component';
import { WelcomeComponent } from '@components/welcome/welcome.component';
import { ScoreRouteGuardService } from '@services/score.guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'quiz',
    loadChildren: () =>
      import('@modules/quiz/quiz.module').then((m) => m.QuizModule),
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
