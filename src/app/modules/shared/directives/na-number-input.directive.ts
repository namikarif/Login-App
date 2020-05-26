import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {toInt} from 'ngx-bootstrap/chronos/utils/type-checks';
import {UtilService} from '@app/modules/shared/services/util.service';

@Directive({
  selector: '[naNumberInput]'
})
export class NaNumberInputDirective {
  numberArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  currentLanguage = this.utilService.currentLanguage();
  @Input('maxLength') maxLength: number;
  @Input('maxValue') maxValue: number;

  constructor(private el: ElementRef,
              private utilService: UtilService) {
    el.nativeElement.autocomplete = 'off';
    el.nativeElement.align = 'right';
    if (this.currentLanguage === 'fa') {
      setTimeout(() => {
        let finallyValue = '';
        for (let i = 0; i < el.nativeElement.value.length; i++) {
          const validNumber = this.numberArray.find(result => el.nativeElement.value[i] === result);
          if (validNumber) {
            finallyValue += this.persianNumbers[el.nativeElement.value[i]];
          }
        }
        el.nativeElement.value = finallyValue;
        el.nativeElement.maxLength = this.maxLength;
      }, 1);
    }
  }

  @HostListener('keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const code = (event.charCode) ? event.charCode : ((event.which) ? event.which : event.keyCode);
    this.el.nativeElement.maxLength = this.maxLength;
    if (code < 48 || code > 57) {
      if (code === 8 || code === 46 || code === 9 || (code > 1775 && code < 1786)) {
      } else {
        event.preventDefault();
      }
    } else {
      const target: any = event.target;
      if (this.maxValue) {
        if ((toInt(target.value + event.key)) > toInt(this.maxValue)) {
          event.preventDefault();
        }
      }
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: any) {
    event.preventDefault();
  }
}
