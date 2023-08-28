const { start } = require("./bundle/index")

const graphQLServer = start();

exports.handler = graphQLServer.createHandler({
  cors: {
    origin: '*'
  }
});
