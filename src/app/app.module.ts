import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';
import {RoutingModule} from './routing.module';
import {EnsureAuthenticated} from './modules/shared/services/ensure-authenticated.service';
import {LoginRedirect} from './modules/shared/services/login-redirect.service';
import {AuthService} from './modules/shared/services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './modules/shared/shared.module';
import {ToastyModule} from 'ng2-toasty';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AlertModule} from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [
    AppComponent,
  ],

  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientModule,
    SharedModule.forRoot(),
    ToastyModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [
    EnsureAuthenticated,
    LoginRedirect,
    AuthService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
