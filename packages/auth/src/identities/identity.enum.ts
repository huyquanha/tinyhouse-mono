import { registerEnumType } from '@nestjs/graphql';

export enum IdentityType {
  LOCAL = 'local',
  OAUTH = 'oauth',
}
registerEnumType(IdentityType, {
  name: 'IdentityType',
});

export enum OAuthProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}
registerEnumType(OAuthProvider, {
  name: 'OAuthProvider',
});
