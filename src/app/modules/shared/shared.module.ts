import {ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GlobalErrorHandlerService} from './services/global-error-handler.service';
import {ToastService} from './services/message/toast.service';
import {TRANSLATION_PROVIDERS} from './services/translate/translations';
import {TranslatePipe} from './services/translate/translate.pipe';
import {TranslateService} from './services/translate/translate.service';
import {UserService} from './services/user.service';
import {UtilService} from './services/util.service';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NaIndicatorComponent} from './components/na-indicator/na-indicator.component';
import {NaDropAndDragDirective} from './directives/na-drop-and-drag.directive';
import {NaLoadingService} from '@app/modules/shared/services/na-loading.service';
import {ExplorerService} from '@app/modules/shared/services/explorer.service';
import {NaLoadingComponent} from '@app/modules/shared/components/na-loading/na-loading.component';
import {NaAlertComponent} from './components/alert/na-alert.component';
import {KlAlertService} from '@app/modules/shared/services/message/alert.service';
import {NaNotFoundComponent} from './components/na-not-found/na-not-found.component';
import {NavDropDownDirective, NavDropDownToggleDirective} from '@app/modules/shared/directives/na-nav.directive';
import {ApiService} from '@app/modules/shared/services/base/api.service';
import {ImageCropperModule} from 'ngx-image-cropper';
import {NaImageCropperComponent} from './components/na-image-cropper/na-image-cropper.component';
import {NaConfirmDialogComponent} from './components/na-confirm-dialog/na-confirm-dialog.component';
import {SafeHtmlPipe} from '@app/modules/shared/pipe/safe-html.pipe';
import {LockScreenComponent} from '@app/modules/shared/components/lock-screen/lock-screen.component';
import {NaConfirmDialogService} from '@app/modules/shared/services/na-confirm-dialog.service';
import {NaSweetAlertService} from '@app/modules/shared/services/message/na-sweet-alert.service';
import {AccordionModule, ModalModule} from 'ngx-bootstrap';
import {SidebarModule} from 'primeng/primeng';
import {NaNumberInputDirective} from '@app/modules/shared/directives/na-number-input.directive';
import {ClickOutsideDirective, MouseOverDirective} from '@app/modules/shared/directives/outside-click.directive';
import {NaOffClickOutsideDirective} from '@app/modules/shared/directives/na-off-click-outside.directive';
import {FullscreenDirective, MobileSidebarToggleDirective, SidebarMinimizeDirective, SidebarOffCanvasCloseDirective, SidebarToggleDirective} from '@app/modules/shared/directives/na-sidebar.directives';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    TranslatePipe,
    NaNumberInputDirective,
    SafeHtmlPipe,
    NaIndicatorComponent,
    NaIndicatorComponent,
    NaDropAndDragDirective,
    NaLoadingComponent,
    NaAlertComponent,
    NaNotFoundComponent,
    NavDropDownDirective,
    NavDropDownToggleDirective,
    MouseOverDirective,
    NaOffClickOutsideDirective,
    SidebarToggleDirective,
    FullscreenDirective,
    SidebarMinimizeDirective,
    MobileSidebarToggleDirective,
    SidebarOffCanvasCloseDirective,
    ClickOutsideDirective,
    NaAlertComponent,
    NaImageCropperComponent,
    NaConfirmDialogComponent,
    LockScreenComponent,
  ],
  exports: [
    // modules
    AccordionModule,
    ModalModule,
    SidebarModule,
    FormsModule,
    ImageCropperModule,
    // directives
    NaDropAndDragDirective,
    NavDropDownDirective,
    NavDropDownToggleDirective,
    NaNumberInputDirective,
    ClickOutsideDirective,
    NaOffClickOutsideDirective,
    MouseOverDirective,
    SidebarToggleDirective,
    FullscreenDirective,
    SidebarMinimizeDirective,
    MobileSidebarToggleDirective,
    SidebarOffCanvasCloseDirective,
    // pipes
    TranslatePipe,
    TranslatePipe,
    SafeHtmlPipe,
    // components
    NaLoadingComponent,
    NaIndicatorComponent,
    NaAlertComponent,
    NaNotFoundComponent,
    NaAlertComponent,
    NaImageCropperComponent,
    NaConfirmDialogComponent,
    LockScreenComponent,
  ],
  schemas: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        FormBuilder,
        {
          provide: ErrorHandler,
          useClass: GlobalErrorHandlerService
        },
        UserService,
        UtilService,
        ApiService,
        TRANSLATION_PROVIDERS,
        TranslateService,
        ToastService,
        NaLoadingService,
        ExplorerService,
        KlAlertService,
        NaSweetAlertService,
        NaConfirmDialogService
      ]
    };
  }
}
