import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ExplorerService} from '@app/modules/shared/services/explorer.service';
import {UserDto, UserLogs} from '@app/modules/shared/model/user.dto';
import {environment} from '@env/environment';

@Component({
  selector: 'na-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  userProfile: UserDto;
  userLogs: Array<UserLogs>;
  userImg = '';
  environment = environment;

  constructor(private explorerService: ExplorerService) {
    this.subscription = explorerService.userStream$.subscribe(response => {
      this.userProfile = response.user;
      this.userLogs = response.logs;
      if (this.userProfile) {
        this.userImg = this.userProfile.user_img ? (environment.apiUrl + '/' + this.userProfile.user_img) : 'assets/img/upload-empty.png';
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
