import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../shared/models/user.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  register(user): Observable<UserModel | any> {
    console.log('user service register');
    return this.http.post(`/api/user/register`, {user});
  }

  getUser(userId): Observable<UserModel> {
    console.log('user service - get specific user');
    return this.http.get<UserModel>('/api/user/' + userId);
  }

  getUserProfileWithFavoriteBeers(userId): Observable<UserModel> {
    console.log('user service - get users favorite beers');
    return this.http.get<UserModel>('/api/user/' + userId);
  }

  addBeerToFavorites(user, beerId): Observable<UserModel | any> {
    console.log('user service - add beer to favorites');
    return this.http.patch(`/api/user/favorite`, {user, beerId});
  }

}
