import { BadRequestException, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DatabaseError } from '@tinyhouse/utils';
import { ObjectId } from 'mongodb';
import {
  GetUserByIdRequest,
  GetUserByIdResponse,
} from '@tinyhouse/profile-client';
import { UsersService } from './user.service';
import { toProtoUserStatus } from './utils';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersService', 'FindOneById')
  async findOneById(data: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    if (!data.id) {
      throw new BadRequestException();
    }
    const user = await this.usersService.findOneById(
      UsersService.ROOT,
      new ObjectId(data.id),
    );
    if (user instanceof DatabaseError) {
      return {
        type: 'error',
        error: {
          message: user.message,
        },
      };
    } else {
      return {
        type: 'success',
        success: {
          id: user._id.toHexString(),
          name: user.name,
          email: user.email,
          income: user.income,
          status: toProtoUserStatus(user.status),
        },
      };
    }
  }
}
