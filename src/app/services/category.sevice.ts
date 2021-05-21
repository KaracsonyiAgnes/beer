import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryModel} from '../shared/models/category.model';

@Injectable({providedIn: 'root'})
export class CategoryService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<CategoryModel>> {
    return this.http.get<any[]>(`/api/category/`);
  }

  getSpecific(categoryId): Observable<CategoryModel> {
    return this.http.get<CategoryModel>('/api/category/' + categoryId);
  }

  /*  delete(id) {
      return this.http.delete(`/api/user/${id}`);
    }*/
}
