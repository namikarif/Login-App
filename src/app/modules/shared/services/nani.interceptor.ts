import {Router} from '@angular/router';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/timeout';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ExplorerService} from '@app/modules/shared/services/explorer.service';

@Injectable()
export class NaNiHttpInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({setHeaders: {'Www-Authorization': 'Bearer ' + token}});

  }

  constructor(private router: Router,
              private injector: Injector,
              private explorerService: ExplorerService,
              private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(req, this.authService.getAuthToken()))
      .catch(err => {
        if (err instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>err).status) {
            case 403:
              return this.handle403Error(req, next);
            case 401:
              return this.authService.logout(() => {
                return this.router.navigateByUrl('/auth/login');
              });
            case 400:
              return Observable.throw(err);
            default:
              return Observable.throw(err);
          }
        } else {
          return Observable.throw(err);
        }
      });
  }

  handle403Error(req, next) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
      return this.authService.refreshToken().switchMap(response => {
        if (response.access_token) {
          const newToken = response.access_token;
          this.tokenSubject.next(newToken);
          return next.handle(this.addToken(req, newToken));
        } else {
          return this.logoutUser();
        }
      }).catch(err => {
        return this.logoutUser();
      }).finally(() => {
        this.isRefreshingToken = false;
      });
    } else {
      return this.tokenSubject
        .filter(token => token !== null)
        .take(1)
        .switchMap(token => {
          return next.handle(this.addToken(req, token));
        });
    }
  }

  logoutUser() {
    this.authService.logout(() => {
      this.router.navigateByUrl('/auth/login');
    });
    return Observable.throw('');
  }

}
