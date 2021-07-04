import { Resolver } from '@nestjs/graphql';
import { User } from './user.model';

@Resolver(() => User)
export class UsersResolver {}
