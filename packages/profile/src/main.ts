import { ConfigService } from '@nestjs/config';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser(configService.get('COOKIE_SECRET')));

  const grpcOptions = app.get('GRPC_OPTIONS');

  const grpcMicroservice = app.connectMicroservice<GrpcOptions>(grpcOptions);

  // Start all microservices.
  await app.startAllMicroservicesAsync(),
    // Start listening for HTTP.
    await app.listen(configService.get<number>('PORT', 3000));
}
bootstrap();
