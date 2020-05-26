import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@app/modules/shared/services/translate/translate.service';
import {AuthService} from '@app/modules/shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NaLoadingService} from '@app/modules/shared/services/na-loading.service';
import {NaSweetAlertService} from '@app/modules/shared/services/message/na-sweet-alert.service';
import 'rxjs/operator/finally';
import {UtilService} from '@app/modules/shared/services/util.service';

@Component({
  selector: 'na-forgot-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  errorStatus = false;
  alertShow = false;
  successStatus = false;
  passwordStatus = false;
  selectedLanguage: string;
  alertMessage: string;
  token: any;
  user = {
    email: '',
    url: window.location.origin
  };
  reset = {
    password: '',
    confirm_password: ''
  };

  constructor(private _translate: TranslateService,
              private authService: AuthService,
              private router: Router,
              private utilService: UtilService,
              private naLoadingService: NaLoadingService,
              private alertService: NaSweetAlertService,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.utilService.currentLanguage()) {
      this.selectedLanguage = this.utilService.currentLanguage();
    } else {
      this.selectedLanguage = 'gb';
    }
    this.selectLang(this.selectedLanguage);
    this.token = this.activeRoute.snapshot.queryParams.token;
  }

  selectLang(lang: string) {
    this._translate.use(lang);
  }

  onSubmit(action: string) {
    this.naLoadingService.show('loading');
    switch (action) {
      case 'forgot':
        this.authService.forgotPassword(this.user).subscribe(() => {
          this.successStatus = true;
          this.errorStatus = false;
          this.naLoadingService.hide();
        }, errForgot => this.handleError(errForgot));
        break;
      case 'reset':
        if (this.reset.password === this.reset.confirm_password) {
          const reset = {
            password: this.reset.password,
            token: this.token,
            url: window.location.origin
          };
          this.authService.resetPassword(reset).subscribe(() => {
            this.naLoadingService.hide();
            this.successStatus = true;
            this.errorStatus = false;
          }, errReset => this.handleError(errReset));
        } else {
          this.passwordStatus = true;
        }
        break;
    }
  }

  handleError(error) {
    this.naLoadingService.hide();
    this.successStatus = false;
    this.errorStatus = true;
    this.alertShow = true;
    this.alertMessage = this.utilService.alertErrorMessage(error);
  }
}
