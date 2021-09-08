import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionResponse } from '@models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {

  // Get Single question from server -- Interceptor error handling
  getQuestion(): Observable<QuestionResponse> {
    return this.httpClient.get<QuestionResponse>(`${environment.remoteServer}`);
  }

  constructor(private httpClient: HttpClient) { }
}
