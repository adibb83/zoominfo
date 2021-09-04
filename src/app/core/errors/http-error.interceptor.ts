import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoggerService } from '@services/logger/logger.service';

@Injectable({
  providedIn: 'root',
})

// global http calls error handling
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private loggerService: LoggerService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let message = `message: ${error.message}, status: ${error.status}, Url: ${error.url}`;
        this.loggerService.debug(message);
        return throwError(message);
      })
    ) as Observable<HttpEvent<any>>;
  }
}
