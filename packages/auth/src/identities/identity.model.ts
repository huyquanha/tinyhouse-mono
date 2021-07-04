import { ObjectType, Field, InterfaceType, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { idMiddleware } from '@tinyhouse/utils';
import { IdentityType, OAuthProvider } from './identity.enum';

@InterfaceType()
export abstract class Identity {
  @Field(() => ID, {
    name: 'id',
    middleware: [idMiddleware],
  })
  _id: ObjectId;

  @Field(() => ID, {
    middleware: [idMiddleware],
  })
  userId: ObjectId;

  @Field(() => IdentityType)
  identityType: IdentityType;
}

@ObjectType({
  implements: () => [Identity],
})
export class LocalIdentity implements Identity {
  _id: ObjectId;

  userId: ObjectId;

  identityType = IdentityType.LOCAL;

  @Field()
  username?: string;

  @Field()
  email?: string;

  @Field()
  password: string;
}

@ObjectType({
  implements: () => [Identity],
})
export class OAuthIdentity implements Identity {
  _id: ObjectId;

  userId: ObjectId;

  identityType = IdentityType.OAUTH;

  @Field(() => OAuthProvider)
  provider: OAuthProvider;

  @Field()
  externalUserId: string;
}
