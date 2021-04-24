export interface Error {
  message: string;
}

export interface UserInputErrors {
  __typename?: 'UserInputErrors';
  errors: UserInputError[];
}

export interface UserInputError extends Error {
  __typename?: 'UserInputError';
  input: string;
}

export interface AuthenticationError extends Error {
  __typename?: 'AuthenticationError';
}

export interface DatabaseError extends Error {
  __typename?: 'DatabaseError';
}
