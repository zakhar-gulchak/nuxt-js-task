import { server } from '../src'

const handler = (event, context) => {
    const graphqlHandler = server.createHandler();
    if (!event.requestContext) {
        event.requestContext = context;
    }

    return graphqlHandler(event, context);
}

export { handler }
