import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KlAlertService} from '@app/modules/shared/services/message/alert.service';
import {Alert} from '@app/modules/shared/enum/alert-type';

@Component({
  selector: 'na-alert',
  templateUrl: './na-alert.component.html',
  styleUrls: ['./na-alert.component.scss']
})
export class NaAlertComponent implements OnInit {
  alerts: Alert[] = [];
  @Input() message: string;
  @Input() type: string;
  @Input() show: boolean;
  @Input() showClose = true;
  @Output() onClose = new EventEmitter<any>();

  constructor(private alertService: KlAlertService) {
  }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      this.alerts = [];
      this.alerts.push(alert);
    });
  }

  removeAlert() {
    this.onClose.emit();
  }

  iconClass(alert) {
    if (!alert) {
      return;
    }
    switch (alert) {
      case 'success':
        return 'fa-check';
      case 'error':
        return 'fa-exclamation-circle';
      case 'info':
        return 'fa-info-circle';
      case 'warning':
        return 'fa-exclamation-triangle';
    }
  }
}
