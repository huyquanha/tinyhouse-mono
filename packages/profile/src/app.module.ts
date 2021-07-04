import { Module, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { RecipesModule } from './recipes/recipe.module';
import Joi from 'joi';
import {
  ASYNC_CONNECTION,
  DatabaseModule,
  databaseValidation,
} from '@tinyhouse/utils';
import { ExpressContext } from 'apollo-server-express';
import { Db, ObjectId } from 'mongodb';
import { User, UsersModule } from './users';
import { GrpcProfileClientModule } from '@tinyhouse/profile-client';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: join(
    __dirname,
    '..',
    `.env.${process.env.NODE_ENV ?? 'development'}`,
  ),
  validationSchema: Joi.object({
    ...databaseValidation,
    PORT: Joi.number().required(),
  }),
  validationOptions: {
    allowUnknown: true, // NestJS defaults to true, but if not passed in, will default to Joi defaults (false)
    abortEarly: false, // default false
  },
});

const graphQLModule = GraphQLModule.forRootAsync({
  imports: [DatabaseModule],
  useFactory: async (db: Db) => ({
    autoSchemaFile: join(__dirname, 'shared/schema.gql'),
    context: async ({ req, res }: ExpressContext) => {
      // TODO: replace with actual implementation of retrieving user id
      // from req, or get the user from session cache instead of db.
      const user = await db.collection<User>('users').findOne({
        _id: new ObjectId('60480fb8a76a2c76b5fc03b2'),
      });
      if (!user) {
        throw new UnauthorizedException();
      }
      return { user, req, res };
    },
  }),
  inject: [ASYNC_CONNECTION],
});

@Module({
  imports: [
    configModule,
    RecipesModule,
    UsersModule,
    graphQLModule,
    GrpcProfileClientModule,
  ],
})
export class AppModule {}
