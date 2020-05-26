import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[naOffClickOutside]'
})
export class NaOffClickOutsideDirective {
  constructor(private _elementRef: ElementRef) {
  }

  @Output()
  public clickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, currentElement: HTMLElement): void {
    if (!currentElement) {
      return;
    }
    const clickedInside = this._elementRef.nativeElement.contains(currentElement);
    if (!clickedInside) {
      event.preventDefault();
    }
  }
}
