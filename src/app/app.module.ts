import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { code64Pipe } from './pipes/code64.pipe';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { QuizComponent } from './pages/quiz/quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { AnswersComponent } from './components/answers/answers.component';
import { ButtonAnimationDirective } from './directives/button-animation.directive';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import { ApiClientService } from '@services/api-client/api-client.service';

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
    CoreModule,
    CarouselModule,
    ButtonModule,
  ],
  providers: [ApiClientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
