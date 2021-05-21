import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  prolfileOpened = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  profileClicked(): void {
    this.prolfileOpened = !this.prolfileOpened;
  }
}
