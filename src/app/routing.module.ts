import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginRedirect} from './modules/shared/services/login-redirect.service';
import {EnsureAuthenticated} from './modules/shared/services/ensure-authenticated.service';
import {NaNotFoundComponent} from '@app/modules/shared/components/na-not-found/na-not-found.component';
import {LockScreenComponent} from '@app/modules/shared/components/lock-screen/lock-screen.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: 'app/modules/dashboard/dashboard.module#DashboardModule',
        canActivate: [EnsureAuthenticated]
      },
      {
        path: 'auth',
        loadChildren: 'app/modules/authentication/authentication.module#AuthenticationModule',
        canActivate: [LoginRedirect]
      },
      {
        path: 'lock-screen',
        component: LockScreenComponent
      },
      {
        path: 'not-found',
        component: NaNotFoundComponent
      },
      {
        path: '**',
        redirectTo: 'not-found'
      },
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class RoutingModule {
}

