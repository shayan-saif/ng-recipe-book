import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeModel } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes: RecipeModel[] = [];
  selectedRecipe: RecipeModel;
  private getSub: Subscription;
  private delSub: Subscription;

  constructor(private recipeService: RecipeService) { }

  onSelectRecipe(recipe: RecipeModel) {
    if (this.selectedRecipe === recipe) {
      this.selectedRecipe = null;
    } else {
      this.selectedRecipe = recipe;
    }
  }

  onDeleteRecipe(recipe: RecipeModel) {
    this.delSub = this.recipeService.deleteRecipe(recipe).subscribe(deletedRecipe => {
      this.selectedRecipe = null;
      this.recipes = this.recipes.filter(recipe => {
        return deletedRecipe._id !== recipe._id;
      })
    });

    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    })
  }



  ngOnInit(): void {
    this.getSub = this.recipeService.getRecipes().subscribe(recipes => this.recipes = recipes);
  }

  ngOnDestroy() {
    this.getSub.unsubscribe();
    this.delSub.unsubscribe();
  }

}
