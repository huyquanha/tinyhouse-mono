import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    avatar: String
    contact: String!
    income: Float
    authorized: Boolean
    hasWallet: Boolean!
  }

  type Query {
    user(id: ID!): User!
  }
`;
