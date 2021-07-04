import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { grpcOptionsFactory } from './grpc-options.provider';
import Joi from 'joi';

const configModule = ConfigModule.forRoot({
  // isGlobal: true,
  envFilePath: join(
    __dirname,
    '..',
    `.env.${process.env.NODE_ENV ?? 'development'}`,
  ),
  validationSchema: Joi.object({
    GRPC_PORT: Joi.number().required(),
  }),
  validationOptions: {
    allowUnknown: true, // NestJS defaults to true, but if not passed in, will default to Joi defaults (false)
    abortEarly: false, // default false
  },
});

@Module({
  imports: [configModule],
  providers: [
    {
      provide: 'GRPC_OPTIONS',
      useFactory: grpcOptionsFactory,
      inject: [ConfigService],
    },
  ],
  exports: ['GRPC_OPTIONS'],
})
export class GrpcProfileClientModule {}
