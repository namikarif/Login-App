import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '@app/modules/shared/services/auth.service';
import {Router} from '@angular/router';
import {TranslateService} from '@app/modules/shared/services/translate/translate.service';
import {ExplorerService} from '@app/modules/shared/services/explorer.service';
import {UtilService} from '@app/modules/shared/services/util.service';
import {Subscription} from 'rxjs';
import {UserDto} from '@app/modules/shared/model/user.dto';
import {NaSweetAlertService} from '@app/modules/shared/services/message/na-sweet-alert.service';

@Component({
  selector: 'na-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() onShowSidebar = new EventEmitter<any>();
  full_name = '';
  showNotification = false;
  showMessage = false;
  toggleNotificationStatus = false;
  toggleMessageStatus = false;
  showMobileMenu = false;

  userProfile: UserDto;
  userStreamSubscription: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private utilService: UtilService,
              private _translate: TranslateService,
              private alertService: NaSweetAlertService,
              private explorerService: ExplorerService) {
    this.userStreamSubscription = explorerService.userStream$.subscribe(response => {
      if (response) {
        this.userProfile = response.user;
      }
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  toggleSidebar() {
    this.onShowSidebar.emit();
  }

  _logout() {
    this.alertService.alert({
      title: 'Çıkış yapılıyor',
      text: 'Çıkış yapmak istediğinizden emin misiniz?'
    }, () => {
      this.auth.logout(() => {
        return this.router.navigateByUrl('/auth/login');
      });
    }, () => {
    });
  }

  lockScreen() {
    localStorage.setItem('lock-screen', 'true');
    this.router.navigateByUrl('/lock-screen');
  }

  showMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  togglePanel(panelName) {
    if (panelName === 'notification') {
      this.showNotification = !this.showNotification;
    } else if (panelName === 'message') {
      this.showMessage = !this.showMessage;
    }
  }

  toggleStatus(panelName) {
    if (panelName === 'notification') {
      this.toggleNotificationStatus = !this.toggleNotificationStatus;
    } else if (panelName === 'message') {
      this.toggleMessageStatus = !this.toggleMessageStatus;
    }
  }

  outsideClick(panelName, event) {
    if (panelName === 'notification') {
      if (!this.toggleNotificationStatus) {
        this.showNotification = event;
      }
    } else if (panelName === 'message') {
      if (!this.toggleMessageStatus) {
        this.showMessage = event;
      }
    }
  }

  mobileMenuOutsideClick() {
    this.showMobileMenu ? (this.showMobileMenu = false) : null;
  }

  ngOnDestroy(): void {
    this.userStreamSubscription.unsubscribe();
  }
}
