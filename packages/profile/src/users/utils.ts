import { assertUnreachable } from '@tinyhouse/utils';
import { UserStatus } from '@tinyhouse/profile-client';
import { UserModelStatus } from './user.model';

export const toProtoUserStatus = (modelUserStatus: UserModelStatus) => {
  switch (modelUserStatus) {
    case UserModelStatus.ACTIVE:
      return UserStatus.ACTIVE;
    case UserModelStatus.PENDING:
      return UserStatus.PENDING;
    default:
      return assertUnreachable(modelUserStatus);
  }
};

export const toUserModelStatus = (protoUserStatus: UserStatus) => {
  switch (protoUserStatus) {
    case UserStatus.ACTIVE:
      return UserModelStatus.ACTIVE;
    case UserStatus.PENDING:
      return UserModelStatus.PENDING;
    default:
      return assertUnreachable(protoUserStatus);
  }
};
