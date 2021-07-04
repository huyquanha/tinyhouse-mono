// Original file: profile/profile.proto

import type {
  GetUserByIdSuccessResponse as __profile_GetUserByIdSuccessResponse,
  GetUserByIdSuccessResponse__Output as __profile_GetUserByIdSuccessResponse__Output,
} from '../_profile/GetUserByIdSuccessResponse';
import type {
  GetUserByIdErrorResponse as __profile_GetUserByIdErrorResponse,
  GetUserByIdErrorResponse__Output as __profile_GetUserByIdErrorResponse__Output,
} from '../_profile/GetUserByIdErrorResponse';

export interface GetUserByIdResponse {
  success?: __profile_GetUserByIdSuccessResponse | null;
  error?: __profile_GetUserByIdErrorResponse | null;
  type?: 'success' | 'error';
}

export interface GetUserByIdResponse__Output {
  success?: __profile_GetUserByIdSuccessResponse__Output;
  error?: __profile_GetUserByIdErrorResponse__Output;
}
