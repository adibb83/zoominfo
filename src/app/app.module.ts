import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { code64Pipe } from '@pipes/code64.pipe';
import { FormsModule } from '@angular/forms';
import { QuizComponent } from '@pages/quiz/quiz.component';
import { QuestionComponent } from '@components/question/question.component';
import { AnswersComponent } from '@components/answers/answers.component';
import { ButtonAnimationDirective } from '@directives/button-animation.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiClientService } from '@services/api-client/api-client.service';
import { HttpErrorInterceptor } from '@interceptors/http-error.interceptor';
import { PrimeNGModule } from '@modules/prime-ng/prime-ng.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    code64Pipe,
    QuizComponent,
    QuestionComponent,
    AnswersComponent,
    ButtonAnimationDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    PrimeNGModule
  ],
  providers: [
    MessageService,
    ApiClientService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
