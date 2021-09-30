const {createServerWithMockedSchema} = require('./server');

const PORT = 4000;

let graphQLServer;

function startHttpServer() {
  return graphQLServer.listen(PORT);
}

async function startGraphQLServer(mocks = null) {
  if (graphQLServer) {
    console.warn("Tried to start HTTP server, when there's already one.");
    return;
  }
  graphQLServer = createServerWithMockedSchema(mocks);
  await startHttpServer();
}

function stopHttpServer() {
  return graphQLServer.stop();
}

async function stopGraphQLServer() {
  if (!graphQLServer) {
    console.warn('Tried to close null HTTP server.');
    return;
  }

  await stopHttpServer();
  graphQLServer = null;
}

module.exports = {
  startGraphQLServer,
  stopGraphQLServer,
};
