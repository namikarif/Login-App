import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UtilService} from '@app/modules/shared/services/util.service';
import * as _ from 'lodash';
import {TranslateService} from '@app/modules/shared/services/translate/translate.service';
import {ToastService} from '@app/modules/shared/services/message/toast.service';
import {ApiService} from '@app/modules/shared/services/base/api.service';
import {NaLoadingService} from '@app/modules/shared/services/na-loading.service';
import {ProfileComponent} from '@dashboard/components/profile/profile.component';
import {ExplorerService} from '@app/modules/shared/services/explorer.service';

interface MenuInterface {
  id?: string;
  title?: string;
  description?: string;
  icon?: string;
  class?: string;
  collapsed?: boolean;
  pinned?: boolean;
  canBePinned?: boolean;
  component?: any;
  children?: Array<MenuInterface>
}

interface FavoriteMenuInterface {
  id?: string;
  description?: string;
  routerLink?: string;
  menu_id?: string;
}

@Component({
  selector: 'na-menu',
  templateUrl: './na-menu.component.html',
  styleUrls: ['./na-menu.component.scss']
})
export class NaMenuComponent implements OnInit {
  @ViewChild('searchInput') private searchInput: ElementRef;
  @ViewChild('filteredMenuList') private filteredMenuList: ElementRef;
  @Input() userRole: any;
  @Output() onHandleError = new EventEmitter();
  structuredMenu: Array<MenuInterface> = [
    {
      id: '01',
      title: 'main_menu',
      icon: 'fa fa-folder-open',
      children: [
        {
          id: '01.01',
          title: 'profile',
          component: ProfileComponent
        }
      ]
    }
  ];
  flatMenu = [];
  filteredMenu2 = [];
  favoriteMenu: Array<FavoriteMenuInterface> = [];
  searchText: string;
  isLoading = false;

  selectionPosition = 0;
  scrollTopPosition = 0;
  scrollBottomPosition = 15;

  constructor(private utilService: UtilService,
              private apiService: ApiService,
              private explorerService: ExplorerService,
              private naLoadingService: NaLoadingService,
              private _translate: TranslateService,
              private toastService: ToastService) {
    this.flattenObjectArray(this.structuredMenu);
  }

  ngOnInit() {
  }

  openComponent(menu: MenuInterface) {
    this.explorerService.openMenu(menu);
  }

  clickFavoriteButton(menuItem: MenuInterface) {
    if (menuItem.pinned) {
      this.removeFavorite({menu_id: menuItem.id});
    } else {
      this.addFavorite(menuItem);
    }
  }

  addFavorite(menuItem: MenuInterface) {
    if (!this.isLoading) {
      const index = _.findIndex(this.favoriteMenu, {menu_id: menuItem.id});
      if (index === -1) {
        this.isLoading = true;
        this.naLoadingService.show('adding');
        const postData = {
          menu_id: menuItem.id,
          description: menuItem.title
        };
        this.apiService.postData('favorites/main-menu-favorites', postData).subscribe(response => {
          this.isLoading = false;
          if (response === undefined) {
            this.handleError('error_data');
          } else {
            this.naLoadingService.hide();
            this.toastService.toastSuccess('menu_added_to_favorite_success');
            this.favoriteMenu.push(response);
            this.makePinned(response.menu_id, true);
          }
        }, error => this.handleError(error));
      }
    }
  }

  removeFavorite(menuItem: FavoriteMenuInterface) {
    if (!this.isLoading) {
      const index = _.findIndex(this.favoriteMenu, {menu_id: menuItem.menu_id});
      if (index !== -1) {
        this.isLoading = true;
        this.naLoadingService.show('deleting');
        const menuId = this.favoriteMenu[index].menu_id;
        this.apiService.deleteData('favorites/main-menu-favorites', this.favoriteMenu[index].id).subscribe(() => {
          this.naLoadingService.hide();
          this.toastService.toastSuccess('menu_remove_to_favorite_success');
          this.favoriteMenu.splice(index, 1);
          this.makePinned(menuId, false);
          this.isLoading = false;
        }, error => this.handleError(error));
      }
    }
  }

  makePinned(menuId, pinned) {
    this.structuredMenu.forEach(structuredMenu => {
      if (structuredMenu.children) {
        structuredMenu.children.forEach(firstStructuredMenu => {
          if (firstStructuredMenu.children) {
            firstStructuredMenu.children.forEach(secondStructuredMenu => {
              if (secondStructuredMenu.children) {
                secondStructuredMenu.children.forEach(thirdStructuredMenu => {
                  if (thirdStructuredMenu.children) {
                    thirdStructuredMenu.children.forEach(fourthStructuredMenu => {
                      if (fourthStructuredMenu.id === menuId) {
                        return fourthStructuredMenu.pinned = pinned;
                      }
                    });
                  } else {
                    if (thirdStructuredMenu.id === menuId) {
                      return thirdStructuredMenu.pinned = pinned;
                    }
                  }
                });
              } else {
                if (secondStructuredMenu.id === menuId) {
                  return secondStructuredMenu.pinned = pinned;
                }
              }
            });
          } else {
            if (firstStructuredMenu.id === menuId) {
              return firstStructuredMenu.pinned = pinned;
            }
          }
        });
      } else {
        if (structuredMenu.id === menuId) {
          return structuredMenu.pinned = pinned;
        }
      }
    });
  }

  transform(items: any[], searchText: string, property: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return this._translate.instant(item[property]).toLowerCase().includes(searchText);
    });
  }

  searchInputValueChange(event) {
    this.selectionPosition = 0;
    this.filteredMenu2 = this.transform(this.flatMenu, event, 'title');
  }

  flattenObjectArray(item: any) {
    if (_.isArray(item)) {
      item.map((it) => {
        return this.flattenObjectArray(it);
      });
    } else {
      if (item.hasOwnProperty('children')) {
        return this.flattenObjectArray(item.children);
      } else {
        if (item.show) {
          this.flatMenu.push(item);
        }
      }
    }
  }

  handleError(error) {
    this.isLoading = false;
    this.naLoadingService.hide();
    this.onHandleError.emit(error);
  }
}
