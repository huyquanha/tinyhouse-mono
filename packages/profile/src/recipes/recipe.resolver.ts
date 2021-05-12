import {
  Args,
  createUnionType,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { NewRecipeInput } from './dtos/new-recipe.input';
import { RecipesArgs } from './dtos/recipe.args';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipe.service';
import { DatabaseError } from '@tinyhouse/utils';

const RecipeResult = createUnionType({
  name: 'RecipeResult',
  types: () => [Recipe, DatabaseError],
});

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query((returns) => RecipeResult)
  async recipe(@Args('id') id: string): Promise<typeof RecipeResult> {
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      return new DatabaseError('abc');
    }
    return recipe;
  }

  @Query((returns) => [Recipe])
  recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipesService.findAll(recipesArgs);
  }

  @Mutation((returns) => Recipe)
  async addRecipe(
    @Args('newRecipeData') newRecipeData: NewRecipeInput,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.create(newRecipeData);
    return recipe;
  }

  @Mutation((returns) => Boolean)
  async removeRecipe(@Args('id') id: string) {
    return this.recipesService.remove(id);
  }
}
