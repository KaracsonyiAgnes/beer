import {CategoryModel} from './category.model';

export interface BeerModel {
  id: string;
  csvId: string;
  name: string;
  description: string;
  image: string;
  categories: Array<CategoryModel>;
  score: number;
}
