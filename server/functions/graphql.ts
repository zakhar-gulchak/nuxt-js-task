import { createServer } from '../src'
import { readFileSync } from "fs"

const handler = (event, context) => {
  const typeDefs = readFileSync('../src/schema/schema.graphql', { encoding: 'utf-8' });
  const server = createServer(typeDefs);
  const graphqlHandler = server.createHandler();
  if (!event.requestContext) {
      event.requestContext = context;
  }

  return graphqlHandler(event, context);
}

export { handler }
