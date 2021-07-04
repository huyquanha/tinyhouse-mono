import type * as grpc from '@grpc/grpc-js';
import type {
  ServiceDefinition,
  EnumTypeDefinition,
  MessageTypeDefinition,
} from '@grpc/proto-loader';

import type {
  UsersServiceClient as __profile_UsersServiceClient,
  UsersServiceDefinition as __profile_UsersServiceDefinition,
} from './_profile/UsersService';

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype,
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  _profile: {
    GetUserByIdErrorResponse: MessageTypeDefinition;
    GetUserByIdRequest: MessageTypeDefinition;
    GetUserByIdResponse: MessageTypeDefinition;
    GetUserByIdSuccessResponse: MessageTypeDefinition;
    UserStatus: EnumTypeDefinition;
    UsersService: SubtypeConstructor<
      typeof grpc.Client,
      __profile_UsersServiceClient
    > & { service: __profile_UsersServiceDefinition };
  };
}
