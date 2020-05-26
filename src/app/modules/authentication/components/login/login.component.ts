import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NaLoadingService} from 'app/modules/shared/services/na-loading.service';
import {UserLoginView} from 'app/data/authentication/models/user-login-view';
import {AuthService} from 'app/modules/shared/services/auth.service';
import {UserService} from 'app/modules/shared/services/user.service';
import {UtilService} from 'app/modules/shared/services/util.service';
import {TranslateService} from '@app/modules/shared/services/translate/translate.service';

@Component({
  selector: 'na-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: UserLoginView = new UserLoginView();
  errorStatus = false;
  alertShow = false;
  errorMessage: string;
  selectedLanguage: string;
  apiUrl = '';
  authUrl = '';

  constructor(private auth: AuthService,
              private router: Router,
              private userService: UserService,
              private _translate: TranslateService,
              private naLoadingService: NaLoadingService,
              private utilService: UtilService) {
  }

  ngOnInit() {
    if (this.utilService.currentLanguage()) {
      this.selectedLanguage = this.utilService.currentLanguage();
    } else {
      this.selectedLanguage = 'gb';
    }
    this.selectLang(this.selectedLanguage);
  }

  selectLang(language: string) {
    this._translate.use(language);
    localStorage.setItem('current_language', language);
    document.getElementsByTagName('html')[0].setAttribute('lang', language);
    if (language !== 'fa' && document.getElementsByTagName('html')[0].hasAttribute('dir')) {
      document.getElementsByTagName('html')[0].removeAttribute('dir');
    } else if (language === 'fa' && !document.getElementsByTagName('html')[0].hasAttribute('dir')) {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    }
  }

  onSubmit() {
    this.naLoadingService.show('loading');
    this.user.grant_type = 'login';
    this.auth.login(this.user).subscribe(loginResponse => {
      if (loginResponse === undefined) {
        this.errorMessage = this.utilService.alertErrorMessage('error_data');
        this.errorStatus = true;
        this.naLoadingService.hide();
      } else {
        this.naLoadingService.hide();
        localStorage.setItem('access_token', loginResponse.access_token);
        localStorage.setItem('refresh_token', loginResponse.refresh_token);
        this.errorStatus = false;
        sessionStorage.setItem('logged', 'true');
        return this.router.navigateByUrl('/dashboard');
      }
    }, error => {
      this.errorMessage = this.utilService.alertErrorMessage(error);
      this.errorStatus = true;
      this.naLoadingService.hide();
    });
  }
}
