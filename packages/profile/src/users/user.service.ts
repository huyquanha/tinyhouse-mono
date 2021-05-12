import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ASYNC_CONNECTION, DatabaseError } from '@tinyhouse/utils';
import { Collection, Db, ObjectId } from 'mongodb';
import { User } from './user.model';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService implements OnModuleInit {
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

  async findOneById(
    identityContext: User,
    id: string,
  ): Promise<User | DatabaseError> {
    const userDocument = await this.users.findOne({
      _id: new ObjectId(id),
    });
    if (!userDocument) {
      return new DatabaseError(`User not found: ${id}`);
    }
    const user = plainToClass(User, userDocument);
    return user;
  }
}
