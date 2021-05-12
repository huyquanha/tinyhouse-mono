import { Global, Module } from '@nestjs/common';
import { ASYNC_CONNECTION } from '../constants';
import { connectionFactory } from './database.provider';

@Global()
@Module({
  providers: [connectionFactory],
  exports: [ASYNC_CONNECTION],
})
export class DatabaseModule {}
