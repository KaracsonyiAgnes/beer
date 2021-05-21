import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BeerModel} from '../shared/models/beer.model';
import {ScoreModel} from '../shared/models/score.model';
import {RecommendedListModel} from '../shared/models/recommended-list';

@Injectable({providedIn: 'root'})
export class BeerService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<BeerModel>> {
    return this.http.get<any[]>(`/api/beer/`);
  }

  getSpecific(beerId): Observable<BeerModel> {
    return this.http.get<BeerModel>('/api/beer/' + beerId);
  }

  getAllFromSpecificCategory(categoryId): Observable<Array<BeerModel>> {
    console.log('beer service - beers from specific category');
    return this.http.post<Array<BeerModel>>(`/api/beer/category`, {categoryId});
  }

  getRecommendedBeers(beerId): Observable<RecommendedListModel> {
    console.log('beer service - recommended beers from Flask API');
    return this.http.post<RecommendedListModel>(`/flask/recommendation`, {beerId});
  }

  getRecommendedBeersFromMongo(beers): Observable<Array<BeerModel>> {
    console.log('beer service - recommended beers from MongoDB');
    return this.http.post<Array<BeerModel>>(`/api/beer/recommendedBeers`, {beers});
  }

  getScoresFromSpecificBeer(beerId): Observable<Array<ScoreModel>> {
    console.log('beer service - scores from specific beer');
    return this.http.get<Array<ScoreModel>>('/api/score/beer/' + beerId);
  }

  ratingBeer(score): Observable<ScoreModel> {
    console.log('beer service - post score to specific beer');
    return this.http.post<ScoreModel>(`/api/score/beer`, {score});
  }

}
