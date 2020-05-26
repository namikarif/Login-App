import {Injectable} from '@angular/core';
import {ToastyConfig, ToastyService} from 'ng2-toasty';
import {TranslateService} from 'app/modules/shared/services/translate/translate.service';

@Injectable()
export class ToastService {

  constructor(private toastService: ToastyService,
              private translateService: TranslateService,
              private toastConfig: ToastyConfig) {
    this.toastConfig.limit = 10;
    this.toastConfig.theme = 'bootstrap';
    this.toastConfig.position = 'top-center';
    this.toastConfig.showClose = false;
  }

  toastSuccess(message = 'success_message', timeout = 5000) {
    this.toastConfig.timeout = timeout;
    const msg = this.translateService.instant(message);
    const title = '';
    this.toastService.success({title, msg});
  }

  toastInfo(message: any, payload?: any, timeout = 5000) {
    this.toastConfig.timeout = timeout;
    const msg = payload + this.translateService.instant(message);
    const title = '';
    this.toastService.info({title, msg});
  }

  toastError(message: any, timeout = 5000) {
    this.toastConfig.timeout = timeout;
    const msg = this.translateService.instant(message);
    const title = '';
    this.toastService.error({title, msg});
  }
}
