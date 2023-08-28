import { server } from '../src'

export default (event, context) => {
    console.log(event, context)
    const graphqlHandler = server.createHandler();
    if (!event.requestContext) {
        event.requestContext = context;
    }

    return graphqlHandler(event, context);
}
