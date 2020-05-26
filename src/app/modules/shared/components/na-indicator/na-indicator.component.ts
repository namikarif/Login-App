import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'na-indicator',
  templateUrl: './na-indicator.component.html',
  styleUrls: ['./na-indicator.component.scss']
})
export class NaIndicatorComponent implements OnInit {
  @Input() show: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
