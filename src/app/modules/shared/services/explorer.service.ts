import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {NaConfirmDialogOptions} from '@app/modules/shared/components/na-confirm-dialog/na-confirm-dialog.component';

@Injectable()
export class ExplorerService {

  private userStream: BehaviorSubject<any> = new BehaviorSubject(null);
  private authUrlStream: BehaviorSubject<string> = new BehaviorSubject(null);
  private openMenuItem: BehaviorSubject<any> = new BehaviorSubject(null);
  private naConfirmDialogStream = new Subject<NaConfirmDialogOptions>();

  userStream$ = this.userStream.asObservable();
  openMenuItem$ = this.openMenuItem.asObservable();
  authUrlStream$ = this.authUrlStream.asObservable();
  public naConfirmDialogStream$ = this.naConfirmDialogStream.asObservable();


  setUserProfile(user: any) {
    this.userStream.next(user);
  }

  setAuthUrlProfile(authUrl: string) {
    this.authUrlStream.next(authUrl);
  }

  openMenu(menuItem) {
    this.openMenuItem.next(menuItem);
  }

  getUserProfile() {
    return this.userStream.getValue();
  }

  openConfirmDialog(options: NaConfirmDialogOptions) {
    this.naConfirmDialogStream.next(options);
  }
}
