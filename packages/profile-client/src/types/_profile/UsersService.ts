// Original file: profile/profile.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type {
  GetUserByIdRequest as __profile_GetUserByIdRequest,
  GetUserByIdRequest__Output as __profile_GetUserByIdRequest__Output,
} from '../_profile/GetUserByIdRequest';
import type {
  GetUserByIdResponse as __profile_GetUserByIdResponse,
  GetUserByIdResponse__Output as __profile_GetUserByIdResponse__Output,
} from '../_profile/GetUserByIdResponse';

export interface UsersServiceClient extends grpc.Client {
  FindOneById(
    argument: __profile_GetUserByIdRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: __profile_GetUserByIdResponse__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  FindOneById(
    argument: __profile_GetUserByIdRequest,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: __profile_GetUserByIdResponse__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  FindOneById(
    argument: __profile_GetUserByIdRequest,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: __profile_GetUserByIdResponse__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  FindOneById(
    argument: __profile_GetUserByIdRequest,
    callback: (
      error?: grpc.ServiceError,
      result?: __profile_GetUserByIdResponse__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  findOneById(
    argument: __profile_GetUserByIdRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: __profile_GetUserByIdResponse__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  findOneById(
    argument: __profile_GetUserByIdRequest,
    metadata: grpc.Metadata,
    callback: (
      error?: grpc.ServiceError,
      result?: __profile_GetUserByIdResponse__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  findOneById(
    argument: __profile_GetUserByIdRequest,
    options: grpc.CallOptions,
    callback: (
      error?: grpc.ServiceError,
      result?: __profile_GetUserByIdResponse__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
  findOneById(
    argument: __profile_GetUserByIdRequest,
    callback: (
      error?: grpc.ServiceError,
      result?: __profile_GetUserByIdResponse__Output,
    ) => void,
  ): grpc.ClientUnaryCall;
}

export interface UsersServiceHandlers
  extends grpc.UntypedServiceImplementation {
  FindOneById: grpc.handleUnaryCall<
    __profile_GetUserByIdRequest__Output,
    __profile_GetUserByIdResponse
  >;
}

export interface UsersServiceDefinition extends grpc.ServiceDefinition {
  FindOneById: MethodDefinition<
    __profile_GetUserByIdRequest,
    __profile_GetUserByIdResponse,
    __profile_GetUserByIdRequest__Output,
    __profile_GetUserByIdResponse__Output
  >;
}
