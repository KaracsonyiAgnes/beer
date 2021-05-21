import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserModel} from '../../shared/models/user.model';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss', '../menu/menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  user: UserModel;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.cd.detectChanges();
  }

  logOut(): void {

  }
}
