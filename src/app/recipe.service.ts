import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RecipeModel } from './recipe.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>('http://localhost:3000/api/recipes');
  }

  deleteRecipe(recipe: RecipeModel) {
    return this.http.delete<RecipeModel>(`http://localhost:3000/api/recipes/${recipe._id}`);
  }



}
