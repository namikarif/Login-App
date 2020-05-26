import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ExplorerService} from '@app/modules/shared/services/explorer.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '@app/modules/shared/services/auth.service';
import {UtilService} from '@app/modules/shared/services/util.service';
import {NaLoadingService} from '@app/modules/shared/services/na-loading.service';
import {TranslateService} from '@app/modules/shared/services/translate/translate.service';
import {ToastService} from '@app/modules/shared/services/message/toast.service';
import {UserDto} from '@app/modules/shared/model/user.dto';
import {environment} from '@env/environment';

@Component({
  selector: 'na-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent implements OnInit {
  headers: HttpHeaders = new HttpHeaders().set('Www-Authorization', 'Bearer ' + localStorage.getItem('access_token'));
  user: UserDto;
  password: string;
  alertMessage = '';
  invalidPassword = false;
  loading = false;
  currentYear: number;
  environment = environment;
  userImg = 'assets/img/avatars/empty.png';
  body = document.querySelector('body');
  currentLanguage = this.utilService.currentLanguage();
  @ViewChild('LockScreenForm') private lockScreenForm: any;


  constructor(private router: Router,
              private naLoadingService: NaLoadingService,
              private utilService: UtilService,
              private toastService: ToastService,
              private explorerService: ExplorerService,
              private authService: AuthService,
              private translateService: TranslateService,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.translateService.use(this.currentLanguage);
    const date = new Date();
    this.currentYear = date.getFullYear();
    this.body.classList.add('lock-screen');
    setTimeout(() => {
      this.http.get(environment.apiUrl + '/user/my', {headers: this.headers}).subscribe((responseUser: any) => {
        this.user = responseUser.data.user;
      }, () => {
        return this.router.navigateByUrl('/auth/login');
      });
    }, 140);
  }

  login() {
    if (this.lockScreenForm.valid) {
      const user = {
        email: this.user.email,
        password: this.password,
        grant_type: 'login'
      };
      this.loading = true;
      this.authService.login(user).subscribe(loginResponse => {
        if (loginResponse === undefined) {
          this.toastService.toastError('error_data');
          this.loading = false;
        } else {
          this.toastService.toastSuccess('login_success');
          localStorage.removeItem('lock-screen');
          this.naLoadingService.hide();
          localStorage.setItem('access_token', loginResponse.access_token);
          localStorage.setItem('refresh_token', loginResponse.refresh_token);
          this.body.classList.remove('lock-screen');
          this.loading = false;
          return this.router.navigateByUrl('/dashboard');
        }
      }, error => {
        this.toastService.toastError(this.utilService.alertErrorMessage(error));
        this.loading = false;
        this.naLoadingService.hide();
      });
    } else {
      this.invalidPassword = true;
    }
  }

  translate(text) {
    return this.translateService.instant(text);
  }

  routerLink(link): any {
    return this.router.navigateByUrl(link);
  }
}
