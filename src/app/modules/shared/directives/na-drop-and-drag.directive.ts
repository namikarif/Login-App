import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[naDropAndDrag]'
})
export class NaDropAndDragDirective {
  @Output() private filesChangeEmitter: EventEmitter<File[]> = new EventEmitter();

  constructor() {
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ['$event'])
  public onDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.filesChangeEmitter.emit(event);
  }
}
