import {Component} from '@angular/core';

@Component({
  selector: 'na-root',
  template: `
    <router-outlet></router-outlet>
    <ng2-toasty [position]="'top-center'"></ng2-toasty>
    <na-loading></na-loading>
  `,
})
export class AppComponent {
  loadingStatus = false;

  constructor() {
    const stopCss = '-webkit-text-stroke: 1px black; font-size: 38px; color: red; font-weight: bold; letter-spacing: -1px; font-family: helvetica;';
    console.log('%c Dur!', stopCss);
    const css = 'color: #6b6969; font-size: 16px; font-weight: 600;';
    console.log('%c Bu, geliştiriciler için tasarlanmış bir tarayıcı özelliğidir!', css);
  }
}
