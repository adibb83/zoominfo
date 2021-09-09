import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';
import { QuizModule } from '@modules/quiz/quiz.module';

// components
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ScoreComponent } from '@components/score/score.component';

// Services
import { ApiClientService } from '@services/api-client.service';
import { HttpErrorInterceptor } from '@interceptors/http-error.interceptor';
import { MessageService } from 'primeng/api';
import { ScoreRouteGuardService } from '@services/score.guard.service';
import { QuizService } from '@services/quiz.service';
import { StoreService } from '@services/store.service';
import { SharedService } from '@services/shared.service';
import { ToastMassageService } from '@services/toast-massage.service';
import { LoggerService } from '@services/logger.service';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { QuizReducer } from '@store/quiz.reducer';
import { EffectsModule } from '@ngrx/effects';
import { QuestionsEffects } from '@store/quiz.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from '@modules/shared/shared.module';

// directives



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ScoreComponent,
  ],
  imports: [
    SharedModule,
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
    ApiClientService,
    ScoreRouteGuardService,
    QuizService,
    StoreService,
    SharedService,
    ToastMassageService,
    LoggerService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
