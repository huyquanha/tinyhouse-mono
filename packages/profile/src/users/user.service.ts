import {
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ASYNC_CONNECTION, DatabaseError } from '@tinyhouse/utils';
import { Collection, Db, ObjectId } from 'mongodb';
import { User } from './user.model';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService implements OnModuleInit {
  static readonly ROOT = 'ROOT';

  private readonly users: Collection<User>;

  constructor(@Inject(ASYNC_CONNECTION) db: Db) {
    this.users = db.collection<User>('users');
  }

  async onModuleInit() {
    await this.users.createIndex(
      {
        email: 1,
      },
      {
        unique: true,
      },
    );
  }

  // TODO: hack to pass in ROOT as a string, re-work later.
  async findOneById(
    identityContext: User | string,
    id: ObjectId,
  ): Promise<User | DatabaseError> {
    if (typeof identityContext === 'string') {
      if (identityContext === UsersService.ROOT) {
        // skip permission checks
      } else {
        throw new InternalServerErrorException();
      }
    } else {
      // perform permission checks on users.
    }
    const userDocument = await this.users.findOne({
      _id: id,
    });
    if (!userDocument) {
      return new DatabaseError(`User not found: ${id}`);
    }
    const user = plainToClass(User, userDocument);
    return user;
  }
}
