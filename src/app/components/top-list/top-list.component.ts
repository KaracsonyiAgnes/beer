import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BeerModel} from '../../shared/models/beer.model';
import {BeerService} from '../../services/beer.service';
import {CategoryService} from '../../services/category.sevice';

@Component({
  selector: 'app-top-list',
  templateUrl: './top-list.component.html',
  styleUrls: ['./top-list.component.scss']
})
export class TopListComponent implements OnInit, AfterViewInit {

  private error: string;
  beers: Array<BeerModel> = null;

  constructor(private beerService: BeerService, private categoryService: CategoryService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.fetchBeers();
    this.cd.detectChanges();
  }

  private fetchBeers(): void {
    this.beerService.getAll().subscribe(
      data => {
        this.beers = data;
        console.log('Top list, beers:', this.beers);
      },
      error => {
        this.error = error;
      }
    );
  }

}
