import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Identity } from '../identities';

@ObjectType()
@Directive('extends')
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => ID, {
    name: 'id',
  })
  @Directive('@external')
  _id: ObjectId;

  @Field((type) => [Identity])
  identities: Identity[];
}
