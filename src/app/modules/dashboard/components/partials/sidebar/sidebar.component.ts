import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TranslateService} from '@app/modules/shared/services/translate/translate.service';
import {ExplorerService} from '@app/modules/shared/services/explorer.service';
import {UtilService} from '@app/modules/shared/services/util.service';
import {Subscription} from 'rxjs/Subscription';
import {NaLoadingService} from '@app/modules/shared/services/na-loading.service';
import {NaSweetAlertService} from '@app/modules/shared/services/message/na-sweet-alert.service';

@Component({
  selector: 'na-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() showSidebar = false;
  @Output() onHideSidebar = new EventEmitter<any>();
  language: any;
  userProfile: any;
  changePass = {
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  };
  alertShow: boolean;
  alertMessage: string;
  alertType: string;
  serverSuccess: boolean;
  serverError: boolean;
  errorShow: boolean;
  periodChanged: boolean;
  changeStatus: boolean;
  passwordNotSame: boolean;
  userStreamSubscription: Subscription;

  constructor(private el: ElementRef,
              private _translate: TranslateService,
              private utilService: UtilService,
              private naSweetAlert: NaSweetAlertService,
              private naLoadingService: NaLoadingService,
              private explorerService: ExplorerService) {
    this.userStreamSubscription = explorerService.userStream$.subscribe(response => {
      if (response) {
        this.userProfile = response;
      }
    });
  }

  ngOnInit() {
    this.language = this.utilService.currentLanguage();
    this.selectLang(this.language);
  }

  selectLang(language: string) {
    this._translate.use(language);
    document.getElementsByTagName('html')[0].setAttribute('lang', language);
    if (language !== 'fa' && document.getElementsByTagName('html')[0].hasAttribute('dir')) {
      document.getElementsByTagName('html')[0].removeAttribute('dir');
    } else if (language === 'fa' && !document.getElementsByTagName('html')[0].hasAttribute('dir')) {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    }
  }

  inputChange() {
    this.serverError = false;
    this.errorShow = false;
    this.serverSuccess = false;
    this.passwordNotSame = false;
  }

  closeSidebar() {
    this.showSidebar = false;
    this.onHideSidebar.emit();
  }

  ngOnDestroy() {
    this.userStreamSubscription.unsubscribe();
  }
}
