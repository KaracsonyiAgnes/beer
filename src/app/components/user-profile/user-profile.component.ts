import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserModel} from '../../shared/models/user.model';
import {UserService} from '../../services/user.service';
import {BeerModel} from '../../shared/models/beer.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: UserModel;
  beers: Array<BeerModel>;
  private error: string;

  constructor(private userService: UserService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.user.id = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.fetchBeers();
    this.cd.detectChanges();
  }

  private fetchBeers(): void {
    this.userService.getUserProfileWithFavoriteBeers(this.user.id).subscribe(
      data => {
        console.log('this user: ', data);
        this.user = data;
      },
      error => {
        this.error = error;
      }
    );
  }
}
