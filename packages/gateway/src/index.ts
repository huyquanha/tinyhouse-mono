import { ApolloGateway } from '@apollo/gateway';

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { helloWorld } from '@tinyhouse/utils';
import { typeDefs } from './typeDefs';

const port = 4000;
const app = express();

const gateway = new ApolloGateway({
  // serviceList: [{ name: 'accounts', url: 'http://localhost:4001' }],
  serviceList: [],
});

const server = new ApolloServer({
  // gateway,
  typeDefs,
  subscriptions: false,
});

server.applyMiddleware({ app });

app.listen({ port }, () => {
  helloWorld();
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});
