import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'na-panel',
  template: `
    <footer>
      <div class="action-groups">
        <div class="left-group">
<!--          <button naSidebarMinimizer (click)="toggleNavigator()">-->
<!--            <i class="nani-icon-panel"></i>-->
<!--          </button>-->
        </div>
        <div class="right-group">
        </div>
        <div class="clearfix"></div>
      </div>
    </footer>
  `,
  styles: [
      `
      .left-group {
        float: left;
      }

      .right-group {
        float: right;
      }
    `
  ]
})
export class PanelComponent implements OnInit {
  @Output() onToggle = new EventEmitter<boolean>();
  isNavigatorCollapsed = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleNavigator() {
    this.onToggle.emit();
  }
}
