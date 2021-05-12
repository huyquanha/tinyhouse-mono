import { ConfigService } from '@nestjs/config';
import { Db, MongoClient } from 'mongodb';
import { ASYNC_CONNECTION } from '../constants';

export interface DatabaseConfig {
  DB_USER: string;
  DB_PASSWORD: string;
  DB_CLUSTER: string;
  DB_NAME: string;
}

/**
 * We expect ConfigModule to be imported in the root
 * app module "globally", and hence ConfigService will be available
 * in this module without explicitly importing ConfigModule.
 * This is because there are some configuration that are only
 * available at the app level (evnFilePath, JOI schema validation),
 * so registering ConfigModule at the root level is more reasonable
 * than in a utility.
 */
export const connectionFactory = {
  provide: ASYNC_CONNECTION,
  useFactory: async (
    configService: ConfigService<DatabaseConfig>,
  ): Promise<Db> => {
    const url = `mongodb+srv://${configService.get(
      'DB_USER',
    )}:${configService.get('DB_PASSWORD')}@${configService.get(
      'DB_CLUSTER',
    )}.mongodb.net/${configService.get('DB_NAME')}?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return client.db();
  },
  inject: [ConfigService],
};
