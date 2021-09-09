import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// Services
import { StoreService } from '@services/store.service';
import { SharedService } from '@services/shared.service';
import { ToastMassageService } from '@services/toast-massage.service';
import { LoggerService } from '@services/logger.service';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        StoreService,
        SharedService,
        ToastMassageService,
        LoggerService,
      ]
    };
  }
}
