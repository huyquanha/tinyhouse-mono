import { Module } from '@nestjs/common';
import { UsersResolver } from './user.resolver';
import { UsersService } from './user.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
