// import { BaseContext } from '@apollo/server';
import { ApolloServer } from "apollo-server-lambda";
// import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
// import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';

import resolvers from './resolvers';
// import { Context, createContext } from './context';
//
// const start = async () => {
//   const server = new ApolloServer<Context>({
//     typeDefs: readFileSync('./src/schema/schema.graphql', { encoding: 'utf-8' }),
//     resolvers,
//     introspection: process.env.NODE_ENV !== 'production'
//   });
//
//   const { url } = await startStandaloneServer(server, {
//     context: createContext,
//     listen: { port: Number(process.env.PORT) || 4000 }
//   });
//
//   console.log(`🚀  Server ready at: ${url}`);
// }

// start();

export const server = new ApolloServer({
  typeDefs: readFileSync('./.netlify/functions-serve/graphql/src/src/schema/schema.graphql', { encoding: 'utf-8' }),
  resolvers,
  introspection: process.env.NODE_ENV !== 'production'
});

// export const graphqlHandler = startServerAndCreateLambdaHandler(
//     createServer(),
//     // We will be using the Proxy V2 handler
//     handlers.createAPIGatewayProxyEventV2RequestHandler(),
// );
