import {BeerModel} from './beer.model';

export interface UserModel {
  id: string;
  name: string;
  email: string;
  favorites: Array<BeerModel>;
}
