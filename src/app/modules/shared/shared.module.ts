import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from '@modules/prime-ng/prime-ng.module';

// pipe
import { code64Pipe } from '@pipes/code64.pipe';
// directives
import { ButtonAnimationDirective } from '@directives/button-animation.directive';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    code64Pipe,
    ButtonAnimationDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    PrimeNGModule
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    PrimeNGModule,
    code64Pipe,
    ButtonAnimationDirective
  ]
})
export class SharedModule { }
