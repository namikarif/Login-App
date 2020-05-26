import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {UtilService} from '@app/modules/shared/services/util.service';

@Injectable()
export class EnsureAuthenticated implements CanActivate {

  constructor(private auth: AuthService,
              private utilService: UtilService,
              private router: Router) {
  }

  canActivate(): boolean {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      if (localStorage.getItem('lock-screen') === 'true') {
        this.router.navigateByUrl('/lock-screen');
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigateByUrl('/auth');
      localStorage.clear();
      return false;
    }
  }
}
