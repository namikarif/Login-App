import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CollapseModule, TabsModule} from 'ngx-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {NaNiHttpInterceptor} from '../shared/services/nani.interceptor';
import {SharedModule} from '../shared/shared.module';
import {LoadingModule} from 'ngx-loading';
import {PanelComponent} from './components/partials/panel/panel.component';
import {HeaderComponent} from './components/partials/header/header.component';
import {MainComponent} from './components/main/main.component';
import {ApiService} from '@app/modules/shared/services/base/api.service';
import {ProfileComponent} from './components/profile/profile.component';
import {SidebarComponent} from './components/partials/sidebar/sidebar.component';
import {NaAlertComponent} from '@app/modules/shared/components/alert/na-alert.component';
import {NaMenuComponent} from './components/partials/na-menu/na-menu.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NaConfirmDialogComponent} from '@app/modules/shared/components/na-confirm-dialog/na-confirm-dialog.component';
import {DynamicModule} from 'ng-dynamic-component';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    PanelComponent,
    ProfileComponent,
    SidebarComponent,
    NaMenuComponent,
  ],
  entryComponents: [
    ProfileComponent,
    NaAlertComponent,
    NaMenuComponent,
    NaAlertComponent,
    NaConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]),
    HttpClientModule,
    DynamicModule.withComponents([ProfileComponent]),
    SharedModule.forRoot(),
    LoadingModule,
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NaNiHttpInterceptor,
      multi: true
    },
    ApiService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [MainComponent]
})
export class DashboardModule {
}
