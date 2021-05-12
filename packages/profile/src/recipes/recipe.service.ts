import { Inject, Injectable } from '@nestjs/common';
import { ASYNC_CONNECTION } from '@tinyhouse/utils';
import { Db } from 'mongodb';
import { NewRecipeInput } from './dtos/new-recipe.input';
import { RecipesArgs } from './dtos/recipe.args';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipesService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  constructor(@Inject(ASYNC_CONNECTION) private database: Db) {}

  async create(data: NewRecipeInput): Promise<Recipe> {
    return {} as Recipe;
  }

  async findOneById(id: string): Promise<Recipe> {
    return {} as Recipe;
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return [] as Recipe[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
