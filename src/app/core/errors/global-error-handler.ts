import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { LoggerService } from '@services/logger/logger.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private loggerService: LoggerService, private zone: NgZone) {}

  // ng zone is for executing work outside of the Angular zone.
  // type should be enum for more varsity of options
  handleError(error: Error) {
    this.zone.run(() => {
      this.loggerService.info(error.message);
    });
  }
}
