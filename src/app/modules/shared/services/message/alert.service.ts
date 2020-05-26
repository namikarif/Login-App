import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Alert, AlertType} from 'app/modules/shared/enum/alert-type';
import {Observable} from 'rxjs/Observable';
import {UtilService} from '@app/modules/shared/services/util.service';

@Injectable()
export class KlAlertService {
  private alertShowStream = new Subject<any>();

  private keepAfterRouteChange = false;

  constructor(private util: UtilService) {
  }

  getAlert(): Observable<any> {
    return this.alertShowStream.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Success, message, keepAfterRouteChange);
  }

  error(error: any) {
    this.alert(AlertType.Error, this.util.alertErrorMessage(error));
  }

  info(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Info, message, keepAfterRouteChange);
  }

  warn(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Warning, message, keepAfterRouteChange);
  }

  alert(type: AlertType, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.alertShowStream.next(<Alert>{type: type, message: message});
  }
}
