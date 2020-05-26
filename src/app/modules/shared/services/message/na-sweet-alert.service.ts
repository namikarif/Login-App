import {Injectable} from '@angular/core';
import swal from 'sweetalert2';
import {assign, noop} from 'lodash';
import {UtilService} from '../util.service';
import {TranslateService} from 'app/modules/shared/services/translate/translate.service';
import {NaConfirmDialogService} from '@app/modules/shared/services/na-confirm-dialog.service';
import {NaConfirmDialogComponent} from '@app/modules/shared/components/na-confirm-dialog/na-confirm-dialog.component';

@Injectable()
export class NaSweetAlertService {

  constructor(private util: UtilService,
              private translate: TranslateService,
              private klConfirmDialogService: NaConfirmDialogService) {
  }

  alert(options: any = {}, successCb = noop, closeCb = noop) {
    const defaultOptions: any = {
      title: this.translate.instant(options.title) || null,
      text: this.translate.instant(options.text) || null,
      buttonsStyling: options.buttonsStyling || false,
      confirmButtonText: options.confirmButtonText || this.translate.instant('do_yes'),
      cancelButtonText: options.cancelButtonText || this.translate.instant('do_no'),
      confirmButtonClass: options.confirmButtonClass || 'btn btn-sm btn-naniblue',
      cancelButtonClass: options.cancelButtonClass || 'btn btn-sm btn-default',
      animation: options.animation || true,
      customClass: options.customClass || 'na-alert',
      width: options.width || 500,
      showConfirmButton: options.showConfirmButton || true,
      showCancelButton: options.showCancelButton || false,
      showCloseButton: options.showCloseButton || true,
      focusConfirm: options.focusConfirm || true
    };

    if (closeCb !== noop) {
      defaultOptions.showCancelButton = options.showCancelButton || true;
      defaultOptions.cancelButtonClass = options.cancelButtonClass || 'btn btn-sm btn-default';
    }
    this.klConfirmDialogService.appendComponentToBody(NaConfirmDialogComponent, assign(options, defaultOptions))
      .then(res => successCb(res), dismiss => closeCb(dismiss));
    // swal(assign(options, defaultOptions))
    //   .then(res => successCb(res), dismiss => closeCb(dismiss));
    // this.explorerService.openConfirmDialog(assign(options, defaultOptions));
  }

  alertDelete(options: any = {}, successCb = noop, closeCb = noop): any {
    const confirm = this.translate.instant(options.confirmButtonText) || this.translate.instant('do_yes');
    const cancel = this.translate.instant(options.cancelButtonText) || this.translate.instant('do_no');
    const defaultOptions: any = {
      title: this.translate.instant('warning'),
      text: this.translate.instant(options.text) || this.translate.instant('entry_must_be_delete'),
      buttonsStyling: options.buttonsStyling || false,
      confirmButtonText: confirm,
      input: options.confirm ? 'checkbox' : '',
      inputPlaceholder: options.inputPlaceholder || '',
      cancelButtonText: cancel,
      html: options.html || '',
      confirmButtonClass: options.confirmButtonClass || 'btn btn-sm btn-naniblue',
      cancelButtonClass: options.cancelButtonClass || 'btn btn-sm btn-default',
      animation: options.animation || true,
      customClass: options.customClass || 'na-alert',
      width: options.width || 500,
      showConfirmButton: options.showConfirmButton || true,
      showCancelButton: options.showCancelButton || true,
      showCloseButton: options.showCloseButton || true,
      focusConfirm: options.focusConfirm || false,
      focusCancel: options.focusCancel || true,
    };
    if (closeCb !== noop) {
      defaultOptions.showCancelButton = options.showCancelButton || true;
      defaultOptions.cancelButtonClass = options.cancelButtonClass || 'btn btn-sm btn-default';
    }
    return this.klConfirmDialogService.appendComponentToBody(NaConfirmDialogComponent, assign(options, defaultOptions))
      .then(res => successCb(res), dismiss => closeCb(dismiss));
  }

  alertError(options: any = {}, err?, serviceLevel = true, successCb = noop, closeCb = noop) {
    const title = this.translate.instant(options.title) || this.translate.instant('error');
    const translatedText = this.translate.instant(options.text);
    const sendReport = this.translate.instant(options.confirmButtonText) || this.translate.instant('send_report');
    const okText = this.translate.instant(options.cancelButtonText) || this.translate.instant('ok');
    const errorContext = this.util.errorMaker(err, serviceLevel);
    const defaultOptions = {
      type: 'error',
      customClass: options.customClass || 'na-alert',
      confirmButtonClass: 'btn btn-sm btn-danger',
      showCancelButton: options.showCancelButton || true,
      title: title,
      text: translatedText || null,
      html: errorContext.html || '',
      buttonsStyling: options.buttonsStyling || false,
      confirmButtonText: sendReport,
      cancelButtonText: okText,
      cancelButtonClass: options.cancelButtonClass || 'btn btn-sm btn-default',
      animation: options.animation || true,
      width: options.width || 500,
      showConfirmButton: options.showConfirmButton || true,
      showCloseButton: options.showCloseButton || true,
      focusConfirm: options.focusConfirm || false,
      focusCancel: options.focusCancel || false,
    };
    const _successCb = errorContext.callback || successCb;
    return this.alert(assign(defaultOptions, options), _successCb, closeCb);
  }

  alertInfo(options: any = {}, successCb = noop, closeCb = noop) {
    const defaultOptions = {
      type: 'info',
      customClass: options.customClass || 'na-alert',
      confirmButtonClass: 'btn btn-md btn-info',
    };
    this.alert(assign(defaultOptions, options), successCb, closeCb);
  }

  entryInfo(options: any = {}, res: any, successCb = noop, closeCb = noop) {
    const created_date = new Date(res.created_date);
    const modified_date = new Date(res.modified_date);
    const cYear = created_date.getFullYear();
    const cMonth = created_date.getMonth() + 1;
    const cDay = created_date.getDate();
    const cHours = created_date.getHours();
    const cMinutes = created_date.getMinutes();
    const cSeconds = created_date.getSeconds();
    const mYear = modified_date.getFullYear();
    const mMonth = modified_date.getMonth() + 1;
    const mDay = modified_date.getDate();
    const mHours = modified_date.getHours();
    const mMinutes = modified_date.getMinutes();
    const mSeconds = modified_date.getSeconds();
    const added = this.translate.instant('added');
    const last_changed = this.translate.instant('last_changed');
    const title = this.translate.instant(options.title) || this.translate.instant('entry_info');
    const okText = this.translate.instant(options.cancelButtonText) || this.translate.instant('ok');
    const defaultOptions: any = {
      title: title,
      confirmButtonText: okText,
      confirmButtonClass: options.confirmButtonClass || 'btn btn-sm btn-default',
      animation: options.animation || true,
      showConfirmButton: options.showConfirmButton || true,
      showCancelButton: options.showCancelButton || false,
      showCloseButton: options.showCloseButton || true,
      focusConfirm: false,
      customClass: options.customClass || 'na-alert na-info na-entry-info',
      html: `<div class="info-container">
          <div class="info-body">
            <div class="info-title col-md-3 col-sm-12">
              <div class="info-icon-created md"></div>
              <label class="info-title-label">${added}</label>
            </div>
            <div class="col-md-1">
              <label class="info-title-label">:</label>
            </div>
            <div class="info-user col-md-2 col-sm-12">
              <div class="info-icon-user md"></div>
              <label class="info-title-label">${res.created_user.full_name}</label>
            </div>
            <div class="info-date col-md-3 col-sm-12">
              <div class="info-icon-date md"></div>
              <label class="info-title-label">${cDay < 10 ? '0' + cDay : cDay}.${cMonth < 10 ? '0' + cMonth : cMonth}.${cYear}</label>
            </div>
            <div class="info-time col-md-3 col-sm-12">
              <div class="info-icon-time md"></div>
              <label class="info-title-label">${cHours < 10 ? '0' + cHours : cHours}:${cMinutes < 10 ? '0' + cMinutes : cMinutes}:${cSeconds < 10 ? '0' + cSeconds : cSeconds}</label>
              </div>
          </div>
          <hr>
          <div class="info-body">
            <div class="info-title col-md-3 col-sm-12">
              <div class="info-icon-changed md"></div>
              <label class="info-title-label">${last_changed}</label>
            </div>
            <div class="col-md-1">
              <label class="info-title-label">:</label>
            </div>
            <div class="info-user col-md-2 col-sm-12">
              <div class="info-icon-user md"></div>
              <label class="info-title-label">${res.modified_user.full_name}</label>
            </div>
            <div class="info-date col-md-3 col-sm-12">
              <div class="info-icon-date md"></div>
              <label class="info-title-label">${mDay < 10 ? '0' + mDay : mDay}.${mMonth < 10 ? '0' + mMonth : mMonth}.${mYear}</label>
            </div>
            <div class="info-time col-md-3 col-sm-12">
              <div class="info-icon-time md"></div>
              <label class="info-title-label">${mHours < 10 ? '0' + mHours : mHours}:${mMinutes < 10 ? '0' + mMinutes : mMinutes}:${mSeconds < 10 ? '0' + mSeconds : mSeconds}</label>
            </div>
          </div>
        </div>`
    };

    if (closeCb !== noop) {
      defaultOptions.showCancelButton = options.showCancelButton || true;
      defaultOptions.cancelButtonClass = options.cancelButtonClass || 'btn btn-sm btn-secondary';
    }

    swal(assign(defaultOptions, options))
      .then(res => successCb(res), dismiss => closeCb(dismiss));
  }
}
