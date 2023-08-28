const { createLambdaServer } = require("./bundle/index")

const graphQLServer = createLambdaServer();

exports.handler = graphQLServer;
