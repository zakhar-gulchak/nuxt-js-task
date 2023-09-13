import { ApolloServer } from '@apollo/server';
import { ApolloServer as ApolloServerLambda } from "apollo-server-lambda";
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';

import resolvers from './resolvers';
import { Context, createContext } from './context';

const start = async () => {
  const server = new ApolloServer<Context>({
    typeDefs: readFileSync('./src/schema/schema.graphql', { encoding: 'utf-8' }),
    resolvers,
    introspection: process.env.NODE_ENV !== 'production'
  });

  const { url } = await startStandaloneServer(server, {
    context: createContext,
    listen: { port: Number(process.env.PORT) || 4000 }
  });

  console.log(`🚀  Server ready at: ${url}`);
}

if (process.env.ENV === 'service') { // todo: check if running not as a function instead
  start();
}

export const createServer = (typeDefs: any) => new ApolloServerLambda({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production'
});
