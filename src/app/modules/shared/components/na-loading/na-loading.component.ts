import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NaLoadingService} from '@app/modules/shared/services/na-loading.service';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'na-loading',
  templateUrl: './na-loading.component.html',
  styleUrls: ['./na-loading.component.scss']
})
export class NaLoadingComponent implements OnInit, OnDestroy {
  private showSubscription: ISubscription;
  private hideSubscription: ISubscription;

  @Input() name: string;

  show: boolean;

  loadingText: string;

  constructor(private naLoadingService: NaLoadingService,
              private cd: ChangeDetectorRef) {
    this.showSubscription = naLoadingService.loadingShowStream$.subscribe(response => {
        this.show = true;
        this.loadingText = response;
        this.cd.detectChanges();
      });
    this.hideSubscription = naLoadingService.loadingHideStream$.subscribe(response => {
        this.loadingText = '';
        this.show = false;
        this.cd.detectChanges();
      });
  }

  ngOnInit(): void {
    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
  }

  ngOnDestroy() {
    this.showSubscription.unsubscribe();
    this.hideSubscription.unsubscribe();
  }
}
