import {ApplicationRef, Compiler, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {ExplorerService} from '@app/modules/shared/services/explorer.service';

@Injectable()
export class NaConfirmDialogService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private explorerService: ExplorerService,
              private compiler: Compiler,
              private applicationRef: ApplicationRef,
              private injector: Injector) {

  }

  appendComponentToBody(component: any, options) {
    return new Promise((resolve, reject) => {
      const componentRef: any = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);
      componentRef.instance['options'] = options;
      this.applicationRef.attachView(componentRef.hostView);
      const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
      componentRef.instance.onConfirmCall.subscribe(response => {
        resolve(response);
        this.removeComponentFromBody(componentRef);
      });
      componentRef.instance.onCancelCall.subscribe(response => {
        reject(response);
        this.removeComponentFromBody(componentRef);
      });
    });
  }

  removeComponentFromBody(componentRef: ComponentRef<any>) {
    this.applicationRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
