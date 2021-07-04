import { Field, InputType } from '@nestjs/graphql';
import { IdentityType, OAuthProvider } from 'src/identities';

@InputType()
export class LogInInput {
  @Field(() => IdentityType)
  identityType: IdentityType;

  @Field(() => OAuthProvider, {
    description: `Required for ${IdentityType.OAUTH}`,
  })
  provider?: OAuthProvider;

  @Field({
    description: `Required for ${IdentityType.OAUTH}`,
  })
  code?: string;

  @Field({
    description: `Required for ${IdentityType.LOCAL}`,
  })
  email?: string;

  @Field({
    description: `Required for ${IdentityType.LOCAL}`,
  })
  password?: string;
}
