import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class NaLoadingService {
  public status: Subject<boolean> = new Subject<boolean>();
  private loadingHideStream = new Subject<any>();
  private loadingShowStream = new Subject<any>();

  loadingShowStream$ = this.loadingShowStream.asObservable();
  loadingHideStream$ = this.loadingHideStream.asObservable();

  constructor() {
  }

  showLoading(text: string) {
    this.loadingShowStream.next(text);
  }

  hideLoading() {
    this.loadingHideStream.next(true);
  }

  changeStatus(status: boolean) {
    this.status.next(status);
  }

  show(loadingName: string): void {
    this.showLoading(loadingName);
  }

  hide(): void {
    this.hideLoading();
  }
}
