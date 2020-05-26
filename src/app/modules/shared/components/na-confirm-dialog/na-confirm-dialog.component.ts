import {AfterViewInit, Component, ComponentRef, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';

export interface NaConfirmDialogOptions {
  title?: string;
  text?: string;
  html?: string;
  customClass?: string;
  confirm?: boolean;
  inputPlaceholder?: string;
  allowEscapeKey?: boolean;
  allowEnterKey?: boolean;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonClass?: string;
  cancelButtonClass?: string;
}

@Component({
  selector: 'na-confirm-dialog',
  templateUrl: 'na-confirm-dialog.component.html',
  styleUrls: ['na-confirm-dialog.component.scss']
})
export class NaConfirmDialogComponent implements AfterViewInit, OnInit {
  @ViewChild('naConfirmDialog', {read: ViewContainerRef}) private container: ViewContainerRef;
  @ViewChild('container', {read: ViewContainerRef}) dynamicTabPlaceholder;
  @ViewChildren('focusElement') private focusElement: ElementRef;
  @Output() onConfirmCall = new EventEmitter<any>();
  @Output() onCancelCall = new EventEmitter<any>();
  checkbox = false;

  options: NaConfirmDialogOptions = {
    title: '',
    text: '',
    customClass: '',
    html: '',
    allowEscapeKey: true,
    allowEnterKey: true,
    showConfirmButton: true,
    showCancelButton: true,
    confirm: false,
    inputPlaceholder: '',
    confirmButtonText: '',
    cancelButtonText: '',
    confirmButtonClass: '',
    cancelButtonClass: ''
  };

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 37) {
      const confirmButton = document.getElementById('confirmButton');
      if (confirmButton) {
        confirmButton.focus();
      }
    }
    if (event.keyCode === 39) {
      const cancelButton = document.getElementById('cancelButton');
      if (cancelButton) {
        cancelButton.focus();
      }
    }
    if (event.keyCode === 9 || event.keyCode === 27) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
    }
  }

  @HostListener('document:contextmenu', ['$event'])
  contextMenu(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const confirmButton = document.getElementById('confirmButton');
    confirmButton.focus();
  }

  onConfirm() {
    this.onConfirmCall.emit(this.options.confirm ? (this.checkbox ? 1 : 0) : null);
  }

  onCancel() {
    this.onCancelCall.emit();
  }
}
