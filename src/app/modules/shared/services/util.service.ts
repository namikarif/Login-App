import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@app/modules/shared/services/translate/translate.service';
import {toInt} from 'ngx-bootstrap/chronos/utils/type-checks';
import {Guid} from 'guid-typescript';

@Injectable()
export class UtilService {
  rolePermission: any;
  userRole: any;

  constructor(private translateService: TranslateService) {
  }

  currentLanguage() {
    return localStorage.getItem('current_language') ? localStorage.getItem('current_language') : 'gb';
  }

  toIntExt(value) {
    if (value !== null) {
      if (typeof value === 'string') {
        return toInt(value);
      } else if (typeof value === 'number') {
        return value;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  hasProperty(object, findKey) {
    if (typeof object === 'object') {
      return Object.keys(object).find(key => key === findKey);
    } else {
      return false;
    }
  }

  alertErrorMessage(error: any, serviceLevel = true) {
    let message = '';
    if (error instanceof HttpErrorResponse && serviceLevel === true) {
      const responseError = error.error;
      if (error.status >= 400 && responseError) {
        if (error.status === 404) {
          message = responseError.path + ' ' + responseError.error;
        } else {
          if (responseError.hasOwnProperty('uimessage')) {
            message = responseError.uimessage[0] ? (responseError.uimessage[0].text + '\n') : '';
            if (responseError.iomessage.length > 0) {
              message = message + (responseError.iomessage[1] ? responseError.iomessage[1].text : responseError.iomessage[0].text) + '\n';
            }
          } else if (responseError.hasOwnProperty('error_description')) {
            message = responseError.error_description === 'Bad credentials' ? this.translateService.instant('bad_credentials') : this.translateService.instant('could_not_login');
          } else if (responseError.hasOwnProperty('exception')) {
            message = responseError.exception;
          } else {
            message = this.translateService.instant('untitled_error');
          }
        }
      } else {
        message = this.translateService.instant('could_not_connect_server');
      }
    } else {
      if (error.name === 'HttpErrorResponse') {
        if (error.status === 400) {
          message = this.translateService.instant('Post edilen veri hatalı');
        } else {
          message = this.translateService.instant('could_not_connect_server');
        }
      } else {
        message = error.message ? error.message : error.toString();
      }
    }
    return message;
  }

  errorMaker(error: Error, serviceLevel = true) {
    let html;
    const context = Object.create(null);
    // EGER SERVISTEN BIR HATA GELIRSE
    if (error instanceof HttpErrorResponse && serviceLevel === true) {
      const responseError = error.error;
      if (error.status >= 400 && responseError) {
        if (responseError.hasOwnProperty('uimessage')) {
          context.uimessage = responseError.uimessage.map(err => {
            return err.text;
          });
          context.iomessage = responseError.iomessage.map(err => {
            return err.text;
          });
        } else if (responseError.hasOwnProperty('error_description')) {
          context.uimessage = responseError.error_description === 'Bad credentials' ? this.translateService.instant('bad_credentials') : this.translateService.instant('could_not_login');
          context.iomessage = [context.uimessage];
        } else if (responseError.hasOwnProperty('exception')) {
          context.uimessage = responseError.exception;
          context.iomessage = [context.uimessage];
        } else {
          context.uimessage = this.translateService.instant('untitled_error');
          context.iomessage = [context.uimessage];
        }
      } else {
        context.uimessage = this.translateService.instant('could_not_connect_server');
        context.iomessage = [error.message];
      }
    } else {
      if (error.name === 'HttpErrorResponse') {
        context.uimessage = this.translateService.instant('could_not_connect_server');
      } else {
        context.uimessage = [error.message ? error.message : error.toString()];
        context.iomessage = [error.stack];
      }
    }
    if (error.name === 'HttpErrorResponse') {
      html = `<ul>
                ${context.uimessage}
            </ul>`;
    } else {
      html = `<ul>
                ${context.uimessage.join('')}
            </ul>
            ${context.iomessage.length ?
        '<label for="toggleCheckbox" id="toggleCheckboxLabel">Hata detayları</label>' +
        '<input type="checkbox" id="toggleCheckbox" class="toggle_checkbox">'
        : ''}
            <code>
                 <ul>
                    ${context.iomessage.join('')}
                </ul>
                <button class="btn btn-sm btn-default">${this.translateService.instant('send_report')}</button>
            </code>
    `;
    }
    context.html = html;
    return context;
  }

  deepCopy<T>(source: T): T {
    if (source === undefined) {
      return null;
    } else {
      return JSON.parse(JSON.stringify(source));
    }
  }

  round(number, precision) {
    const factor = Math.pow(10, precision);
    const tempNumber = number * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }

  convertToFloat(number) {
    let pointNum = 0;

    if (number === null) {
      number = 0;
    }
    pointNum = parseFloat(number);

    return pointNum;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  createGUID() {
    return Guid.create()['value'];
  }
}
