import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

import { NavList, NavListItem } from './navlist.data';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnChanges {
  @Input() sideNavShow: boolean;
  @Output() changeSideNavState: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  navList: NavListItem[] = NavList;

  isAuthenticated = false;

  constructor() {}

  ngOnInit(): void {}

  closeNav(): void {
    this.changeSideNavState.emit(false);
    document.getElementById('mySidenav').style.width = '0';
  }

  ngOnChanges(): void {
    if (this.sideNavShow === true) {
      this.changeSideNavState.emit(true);
      document.getElementById('mySidenav').style.width = '250px';
    } else {
      this.changeSideNavState.emit(false);
      document.getElementById('mySidenav').style.width = '0';
    }
  }

  conditionCheck(condition: boolean, onAuthenticate: boolean): boolean {
    if (condition && onAuthenticate) {
      return this.isAuthenticated;
    } else if (condition && !onAuthenticate) {
      return !this.isAuthenticated;
    } else {
      return true;
    }
  }
}
