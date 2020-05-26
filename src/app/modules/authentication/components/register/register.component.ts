import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '@app/modules/shared/services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '@app/modules/shared/services/user.service';
import {TranslateService} from '@app/modules/shared/services/translate/translate.service';
import {NaLoadingService} from '@app/modules/shared/services/na-loading.service';
import {UtilService} from '@app/modules/shared/services/util.service';
import {ApiService} from '@app/modules/shared/services/base/api.service';
import {UserDto} from '@app/modules/shared/model/user.dto';

@Component({
  selector: 'na-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: UserDto = {
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
    grant_type: 'register',
    base64_image: ''
  };
  userImg = 'assets/img/upload-empty.png';
  errorStatus = false;
  alertShow = false;
  errorMessage: string;
  selectedLanguage: string;
  showImageCropper = false;
  showImage = false;
  @ViewChild('RegisterForm') registerForm: any;

  constructor(private auth: AuthService,
              private router: Router,
              private apiService: ApiService,
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
    if (this.registerForm.valid) {
      this.user.current_lang = this.selectedLanguage;
      this.user.rule = this.user.rule ? 1 : 0;
      this.naLoadingService.show('user_register');
      this.auth.register(this.user).subscribe(loginResponse => {
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
    } else {
      this.alertShow = true;
      this.errorMessage = '';
    }
  }

  onApplyImage(event) {
    this.userImg = event.base64;
    const imgResult = this.userImg.split(',');
    this.user.base64_image = imgResult[1];
  }

  closeImageModal() {
    this.showImageCropper = false;
    this.showImage = false;
  }

  // fake click to file input
  openImg(event) {
    this.showImageCropper = true;
    this.showImage = true;
    event.preventDefault();
  }

  openImageCropper() {
    this.showImageCropper = true;
    this.showImage = false;
  }
}
