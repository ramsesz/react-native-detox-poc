const {createServerWithMockedSchema} = require('./server');
const server = createServerWithMockedSchema();

// The `listen` method launches a web server.
server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
