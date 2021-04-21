export interface RecipeModel {
  _id: string,
  title: string,
  description: string,
  img: string,
  ingredients: [],
  steps: [],
  dateCreated?: Date
}