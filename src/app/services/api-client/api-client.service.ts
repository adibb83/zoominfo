import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '@services/logger/logger.service';
import { forkJoin, Observable } from 'rxjs';
import { concatMap, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { QuestionResponse } from '@models/quiz.model';

@Injectable({
  providedIn: 'root',
})

export class ApiClientService {

  constructor(
    private logger: LoggerService,
    private httpClient: HttpClient) { }

  // Get Single question from server -- global error handling
  getQuestion(): Observable<QuestionResponse> {
    this.logger.info('fetching Question');
    return this.httpClient.get<QuestionResponse>(`${environment.remoteServer}`).pipe(
      retry(3)
    );
  }
}
