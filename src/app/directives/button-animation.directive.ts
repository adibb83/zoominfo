import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButtonAnimation]'
})
export class ButtonAnimationDirective {
  @Input() isCorrect!: boolean;
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  @HostListener('click', ['$event']) onClick($event: Event) {
    console.info('clicked: ' + $event.target);
    this.isCorrect ?
      this.renderer.addClass(this.el.nativeElement, 'btn--blink') :
      this.renderer.addClass(this.el.nativeElement, 'btn--wiggle')
    this.el.nativeElement.disabled = true;
  }
}
