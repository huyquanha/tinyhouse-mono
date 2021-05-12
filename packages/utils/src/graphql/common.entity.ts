import { Field, InterfaceType, ObjectType } from '@nestjs/graphql';

@ObjectType({
  implements: () => [Error],
})
export class AuthenticationError implements Error {
  @Field()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

@ObjectType({
  implements: () => [Error],
})
export class UserInputError implements Error {
  @Field()
  message: string;

  @Field()
  input: string;

  constructor(message: string, input: string) {
    this.message = message;
    this.input = input;
  }
}

@ObjectType()
export class UserInputErrors {
  @Field((type) => [UserInputError])
  errors: UserInputError[];

  constructor(errors: UserInputError[]) {
    this.errors = errors;
  }
}

@ObjectType({
  implements: () => [Error],
})
export class DatabaseError implements Error {
  @Field()
  readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}

@InterfaceType()
export abstract class Error {
  @Field()
  message: string;
}
