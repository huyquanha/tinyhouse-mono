import {
  Directive,
  Field,
  FieldMiddleware,
  Float,
  ID,
  MiddlewareContext,
  NextFn,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { idMiddleware } from '@tinyhouse/utils';

export enum UserModelStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
}
registerEnumType(UserModelStatus, {
  name: 'UserModelStatus',
});

const incomeMiddleware: FieldMiddleware<User, { user: User }, never> = async (
  ctx: MiddlewareContext<User, { user: User }, never>,
  next: NextFn<number>,
): Promise<number | null> => {
  const income = await next();
  const rootVal = ctx.source;
  const identityCtx = ctx.context.user;
  if (identityCtx._id.equals(rootVal._id)) {
    return income;
  }
  return null;
};

const walletMiddleware: FieldMiddleware = async (
  _ctx,
  next: NextFn<number | undefined>,
): Promise<boolean> => {
  const walletId = await next();
  return !!walletId;
};

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID, {
    name: 'id',
    middleware: [idMiddleware],
  })
  _id: ObjectId;

  @Field(() => UserModelStatus)
  status: UserModelStatus;

  @Field()
  role?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  email: string;

  @Field(() => Float, {
    nullable: true,
    middleware: [incomeMiddleware as FieldMiddleware],
  })
  income: number;

  @Field((type) => Boolean, {
    name: 'hasWallet',
    middleware: [walletMiddleware],
  })
  walletId?: string;
}
