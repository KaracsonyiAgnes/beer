import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BeerModel} from '../../shared/models/beer.model';
import {ScoreModel} from '../../shared/models/score.model';
import {BeerService} from '../../services/beer.service';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../shared/models/user.model';
import {RecommendedListModel} from '../../shared/models/recommended-list';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss']
})
export class BeerDetailComponent implements OnInit, AfterViewInit {

  beer: BeerModel;
  beersFromSameCategory: Array<BeerModel>;
  recommendedBeers: Array<BeerModel>;
  recommendationResponse: RecommendedListModel;
  user: UserModel;
  itemImageUrl: string;
  private error: string;

  constructor(private beerService: BeerService, private userService: UserService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.user.id = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.beer = history.state;
    this.fetchOtherBeerData();
  }

  fetchOtherBeerData(): void {
    this.fetchBeersFromSameCategory(this.beer.categories[0]._id);
    this.fetchRecommendedBeers(27);
    this.itemImageUrl = 'assets/beer-pictures/' + this.beer.image;
    this.cd.detectChanges();
  }

  addToFavorites(): void {
    this.userService.getUserProfileWithFavoriteBeers(this.user.id).subscribe(
      data => {
        this.user = data;
        this.userService.addBeerToFavorites(this.user, this.beer.id).subscribe(
          error => {
            this.error = error;
          }
        );
      },
      error => {
        this.error = error;
      }
    );
  }

  ratingBeer(rating: number): void {
    const score: ScoreModel = {
      id: null,
      userId: this.user.id,
      beerId: this.beer.id,
      score: rating
    };
    this.beerService.ratingBeer(score).subscribe(
      () => {
      },
      error => {
        this.error = error;
      }
    );
  }

  navigateToOtherBeersPage(beer: BeerModel): void {
    this.beer = beer;
    this.fetchOtherBeerData();
    window.scrollTo(0, 0);
  }

  private fetchBeersFromSameCategory(categoryId: string): void {
    this.beerService.getAllFromSpecificCategory(categoryId).subscribe(
      data => {
        this.beersFromSameCategory = data;
      },
      error => {
        this.error = error;
      }
    );
  }

  private fetchRecommendedBeers(beerId: number): void {
    this.beerService.getRecommendedBeers(beerId).subscribe(
      data => {
        this.recommendationResponse = data[0];
        this.fetchRecommendedBeersFromMongo();
      },
      error => {
        this.error = error;
      }
    );
  }


  private fetchRecommendedBeersFromMongo(): void {
    const beerIds = Object.values(this.recommendationResponse).splice(0, 5);
    this.beerService.getRecommendedBeersFromMongo(beerIds).subscribe(
      data => {
        this.recommendedBeers = data;
      },
      error => {
        this.error = error;
      }
    );
  }

}
