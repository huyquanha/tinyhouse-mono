export const assertUnreachable = (x: never) => {
  throw new Error(`Unexpected enum: ${x}`);
};
