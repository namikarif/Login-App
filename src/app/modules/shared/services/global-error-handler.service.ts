import {ErrorHandler, Injectable, Injector} from '@angular/core';
import { NaSweetAlertService } from './message/na-sweet-alert.service';
import {NaLoadingService} from '@app/modules/shared/services/na-loading.service';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  // TODO: Buraya dinamik olarak olusturulan confirmboxlarin servisi enjekte edilecek
  constructor(private injector: Injector,
              private naLoadingService: NaLoadingService) {}
  handleError(error: any): void {
    // get the error message
    this.naLoadingService.hide();
    const alertService = this.injector.get(NaSweetAlertService);
    alertService.alertError({
      title: 'error'
    }, error, false, () => {}, () => {});
    throw error;
  }
}
