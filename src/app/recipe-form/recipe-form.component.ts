import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RecipeModel } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {

  recipeForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null),
    img: new FormControl(null),
    ingredients: new FormArray([]),
    steps: new FormArray([])
  })

  addSub: Subscription;

  constructor(private recipeService: RecipeService) { }

  onAddIngredient() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.recipeForm.get('ingredients')).push(control)
  }

  getIngredientControls() {
    return ((<FormArray>this.recipeForm.get('ingredients')).controls)
  }

  onAddStep() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.recipeForm.get('steps')).push(control)
  }

  getStepControls() {
    return ((<FormArray>this.recipeForm.get('steps')).controls)
  }

  onSubmit() {
    const recipe: RecipeModel = this.recipeForm.value;
    this.addSub = this.recipeService.addRecipe(recipe).subscribe();
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    if(this.addSub) {
      this.addSub.unsubscribe();
    }
  }

}
