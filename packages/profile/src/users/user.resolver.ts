import {
  Query,
  Args,
  Context,
  createUnionType,
  Resolver,
} from '@nestjs/graphql';
import { DatabaseError } from '@tinyhouse/utils';
import { ObjectId } from 'mongodb';
import { User } from './user.model';
import { UsersService } from './user.service';

export const UserResult = createUnionType({
  name: 'UserResult',
  types: () => [User, DatabaseError],
});

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => UserResult, {
    name: 'user',
  })
  async getUser(
    @Args('id') id: string,
    @Context() ctx: { user: User },
  ): Promise<typeof UserResult> {
    return this.usersService.findOneById(ctx.user, new ObjectId(id));
  }

  resolveReference(reference: { __typename: string; id: ObjectId }) {
    return this.usersService.findOneById(UsersService.ROOT, reference.id);
  }
}
