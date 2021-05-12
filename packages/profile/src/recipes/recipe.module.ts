import { Module } from '@nestjs/common';
import { RecipesResolver } from './recipe.resolver';
import { RecipesService } from './recipe.service';

@Module({
  providers: [RecipesResolver, RecipesService],
})
export class RecipesModule {}
