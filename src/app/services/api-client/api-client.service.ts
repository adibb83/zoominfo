import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionResponse } from '@models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor(private httpClient: HttpClient) {}

  // Get Single question from server -- global error handling
  getQuestion(): Observable<QuestionResponse> {
    return this.httpClient.get<QuestionResponse>(
      `${environment.remoteServer}sdfsdfsdf`
    );
  }
}
