import { createServer } from '../src'
import { resolve } from 'path'
import { readFileSync } from "fs"

const handler = (event, context) => {
  const pathName = resolve(__dirname, "../src/schema/schema.graphql");
  const typeDefs = readFileSync(pathName, { encoding: 'utf-8' });
  const server = createServer(typeDefs);
  const graphqlHandler = server.createHandler();
  if (!event.requestContext) {
      event.requestContext = context;
  }

  return graphqlHandler(event, context);
}

export { handler }
