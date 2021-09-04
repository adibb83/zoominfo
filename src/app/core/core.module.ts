import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerModule } from './errors/error-handler.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './errors/http-error.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, ErrorHandlerModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
