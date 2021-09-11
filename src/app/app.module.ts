import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuizModule } from '@modules/quiz/quiz.module';
import { environment } from '../environments/environment';
import { SharedModule } from '@modules/shared/shared.module';
import { PrimeNGModule } from '@modules/prime-ng/prime-ng.module';
import { MessageService } from 'primeng/api';

// Services
import { ScoreRouteGuardService } from '@services/score.guard.service';
import { QuizService } from '@services/quiz.service';
import { ApiClientService } from '@services/api-client.service';
import { HttpErrorInterceptor } from '@interceptors/http-error.interceptor';
import { StoreService } from '@services/store.service';
import { SharedService } from '@services/shared.service';
import { ToastMassageService } from '@services/toast-massage.service';
import { LoggerService } from '@services/logger.service';

// NGRX
import { StoreModule } from '@ngrx/store';
import { QuizReducer } from '@store/quiz.reducer';
import { EffectsModule } from '@ngrx/effects';
import { QuestionsEffects } from '@store/quiz.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Components
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ScoreComponent } from '@components/score/score.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, ScoreComponent],
  imports: [
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    PrimeNGModule,
    QuizModule,
    StoreModule.forRoot({ quiz: QuizReducer }),
    EffectsModule.forRoot([QuestionsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    MessageService,
    ScoreRouteGuardService,
    ApiClientService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    QuizService,
    StoreService,
    SharedService,
    ToastMassageService,
    LoggerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
