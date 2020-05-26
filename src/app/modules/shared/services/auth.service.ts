import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import {UserLoginView} from '@app/data/authentication/models/user-login-view';
import {GrantType} from '@app/data/authentication/enums/auth-grant-type.enum';
import {environment} from '@env/environment';
import {OAuthTokenResponse} from '@app/modules/shared/model/oauth-token-response';
import {UserDto} from '@app/modules/shared/model/user.dto';

@Injectable()
export class AuthService {
  private static headers: HttpHeaders = new HttpHeaders().set('Www-Authorization', 'Bearer login');
  protected refresh_token: string;

  constructor(private http: HttpClient) {
  }

  login(user: UserLoginView): Observable<OAuthTokenResponse> {
    const transformedUser = new FormData();
    transformedUser.append('email', user.email);
    transformedUser.append('password', user.password);
    transformedUser.append('grant_type', user.grant_type);
    return this.http.post<OAuthTokenResponse>(`${environment.apiUrl}/oauth/login`, transformedUser, {headers: AuthService.headers});
  }

  register(user: UserDto): Observable<OAuthTokenResponse> {
    const transformedUser = new FormData();
    transformedUser.append('name', user.name);
    transformedUser.append('surname', user.surname);
    transformedUser.append('phone', user.phone);
    transformedUser.append('email', user.email);
    transformedUser.append('password', user.password);
    transformedUser.append('current_lang', user.current_lang);
    transformedUser.append('base64_image', user.base64_image);
    transformedUser.append('rule', user.rule);
    transformedUser.append('grant_type', user.grant_type);
    return this.http.post<OAuthTokenResponse>(`${environment.apiUrl}/oauth/login`, transformedUser, {headers: AuthService.headers});
  }

  forgotPassword(payload): Observable<any> {
    return this.http.post(`${environment.apiUrl}/password/forgot`, payload);
  }

  resetPassword(payload): Observable<any> {
    return this.http.post(`${environment.apiUrl}/password/reset`, payload);
  }

  setPassword(link, payload): Observable<any> {
    return this.http.post(`${environment.apiUrl}/` + link, payload);
  }

  changePassword(payload): Observable<any> {
    return this.http.post(`${environment.apiUrl}/password/change`, payload);
  }

  refreshToken(): Observable<OAuthTokenResponse> {
    const token = localStorage.getItem('refresh_token');
    const tokenBody = new FormData();
    tokenBody.append('grant_type', GrantType.REFRESH_TOKEN);
    tokenBody.append('refresh_token', token);
    return this.http.post<OAuthTokenResponse>(`${environment.apiUrl}/oauth/token`, tokenBody, {headers: AuthService.headers}).delay(200).do(
      response => {
        this.setAuthToken(response.access_token);
      });
  }

  getAuthToken(): string {
    return localStorage.getItem('access_token');
  }

  setAuthToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh_token');
  }

  logout(callback: Function) {
    localStorage.clear();
    if (document.getElementsByTagName('html')[0].hasAttribute('dir')) {
      document.getElementsByTagName('html')[0].removeAttribute('dir');
    }
    callback();
    return Observable.throw('logout');
  }
}
