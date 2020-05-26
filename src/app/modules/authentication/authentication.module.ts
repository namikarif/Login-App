import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';
import {LoadingModule} from 'ngx-loading';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {NaNiHttpInterceptor} from '@app/modules/shared/services/nani.interceptor';
import {RegisterComponent} from './components/register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
    ]),
    FormsModule,
    HttpClientModule,
    SharedModule,
    LoadingModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: NaNiHttpInterceptor, multi: true}],
  entryComponents: [
    LoginComponent,
    ResetPasswordComponent,
  ],
  exports: [RouterModule]
})
export class AuthenticationModule {
}
