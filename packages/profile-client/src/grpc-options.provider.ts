import { ConfigService } from '@nestjs/config';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export interface GrpcOptionsConfig {
  GRPC_PORT: number;
}

export const grpcOptionsFactory = (
  configService: ConfigService<GrpcOptionsConfig>,
): GrpcOptions => {
  return {
    transport: Transport.GRPC,
    options: {
      package: '_profile',
      protoPath: join(__dirname, 'protos/profile.proto'),
      url: `localhost:${configService.get('GRPC_PORT')}`,
      protoLoader: '@grpc/proto-loader',
      loader: {
        keepCase: true,
      },
    },
  };
};
