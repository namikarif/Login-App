import {Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ExplorerService} from 'app/modules/shared/services/explorer.service';
import {ApiService} from 'app/modules/shared/services/base/api.service';
import {Router} from '@angular/router';
import {UtilService} from 'app/modules/shared/services/util.service';
import {HttpClient} from '@angular/common/http';
import {NaLoadingService} from '@app/modules/shared/services/na-loading.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'na-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('DashboardContainer', {read: ViewContainerRef}) componentContainer: ViewContainerRef;
  @Input() mouseUp: boolean;
  private componentRef: ComponentRef<any>;
  body = document.querySelector('body');
  show: boolean;
  showMenu: boolean;
  showSidebar: boolean;
  createSidebar: boolean;
  alertShow = false;
  alertMessage = '';
  date = new Date();

  subscription: Subscription;

  constructor(private explorerService: ExplorerService,
              private utilService: UtilService,
              private naLoading: NaLoadingService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              private httpClient: HttpClient,
              private apiService: ApiService) {
    this.subscription = explorerService.openMenuItem$.subscribe(response => {
      if (response) {
        this.openComponent(response);
      }
    });
  }

  ngOnInit() {
    this.showMenu = false;
    this.naLoading.show('loading');
    if (window.innerWidth > 767) {
      this.body.classList.remove('aside-collapsed');
    } else {
      this.body.classList.add('aside-collapsed');
    }
    if (sessionStorage.getItem('logged')) {
      this.apiService.getAllData('user/my').subscribe(responseUser => {
        this.naLoading.hide();
        if (localStorage.getItem('lock-screen') === 'true') {
          return this.router.navigateByUrl('/lock-screen');
        } else {
          this.explorerService.setUserProfile(responseUser);
          this.show = false;
          this.showMenu = true;
        }
      }, () => {
        this.naLoading.hide();
        return this.router.navigateByUrl('/auth/login');
      });
    } else {
      return this.router.navigateByUrl('/auth/login');
    }
  }

  openComponent(menu) {
    this.destroyComponentRef();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(menu.component);
    this.componentRef = this.componentContainer.createComponent(componentFactory);
  }

  destroyComponentRef() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  handleError(error) {
    this.alertShow = true;
    this.alertMessage = this.utilService.alertErrorMessage(error);
    this.naLoading.hide();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
