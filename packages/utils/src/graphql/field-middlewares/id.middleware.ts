import { FieldMiddleware, NextFn } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';

export const idMiddleware: FieldMiddleware = async (
  _ctx,
  next: NextFn<ObjectId>,
): Promise<string> => {
  const userId = await next();
  return userId.toHexString();
};
