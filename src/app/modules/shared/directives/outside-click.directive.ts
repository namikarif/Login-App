import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[naClickOutside]'
})
export class ClickOutsideDirective {
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
      this.clickOutside.emit(event);
    }
  }
}

@Directive({
  selector: '[naMouseAction]'
})
export class MouseOverDirective {
  constructor(private _elementRef: ElementRef) {
  }

  @HostListener('mouseover', ['$event', '$event.target'])
  toggleSubmenuHover(event, currentElement: HTMLElement) {
    const mouseEnter = this._elementRef.nativeElement.contains(currentElement);
    if (!mouseEnter) {
      this._elementRef.nativeElement.querySelector('.nav-floating').classList.remove('.nav-floating');
    }
  }
}
