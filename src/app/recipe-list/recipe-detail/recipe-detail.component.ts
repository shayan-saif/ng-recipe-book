import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeModel } from 'src/app/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: RecipeModel;
  @Output() deleteRecipe = new EventEmitter<RecipeModel>();

  constructor() { }

  onDeleteRecipe() {
    this.deleteRecipe.emit(this.recipe);
  }


  ngOnInit(): void {
  }

}
