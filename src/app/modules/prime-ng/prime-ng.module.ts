import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

const PRIMENG_IMPORTS = [
  CommonModule,
  CarouselModule,
  ButtonModule,
  ToastModule
];


@NgModule({
  declarations: [],
  imports: [PRIMENG_IMPORTS],
  exports: [PRIMENG_IMPORTS]
})
export class PrimeNGModule { }
