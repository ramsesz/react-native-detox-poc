const {ApolloServer, gql} = require('apollo-server');
const {MOCK_BOXES} = require('./mocks/boxes');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Box {
    id: String
    title: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    boxes: [Box]
  }
`;

const boxes = MOCK_BOXES;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    boxes: () => boxes,
  },
};

const createServerWithMockedSchema = (customMocks = null) => {
  const opts = {typeDefs, resolvers};

  if (customMocks) {
    //@ts-ignore
    opts.mocks = customMocks;
  }
  const server = new ApolloServer(opts);

  return server;
};

// const server = createServerWithMockedSchema();

// // The `listen` method launches a web server.
// server.listen().then(({url}) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

module.exports = {
  createServerWithMockedSchema,
};
