// Original file: profile/profile.proto

import type { UserStatus as __profile_UserStatus } from '../_profile/UserStatus';
import type { Long } from '@grpc/proto-loader';

export interface GetUserByIdSuccessResponse {
  id?: string;
  name?: string;
  email?: string;
  income?: number | string | Long;
  status?: __profile_UserStatus | keyof typeof __profile_UserStatus;
}

export interface GetUserByIdSuccessResponse__Output {
  id?: string;
  name?: string;
  email?: string;
  income?: Long;
  status?: __profile_UserStatus;
}
