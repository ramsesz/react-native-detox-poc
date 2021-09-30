const {ApolloServer, gql} = require('apollo-server');
const {MOCK_BOXES} = require('./mocks/boxes');

// A schema is a collection of type definitions (hence "typeDefs")
const typeDefs = gql`
  type Box {
    id: String
    title: String
  }
  type Query {
    boxes: [Box]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves boxes from the MOCK_BOXES response.
const resolvers = {
  Query: {
    boxes: () => MOCK_BOXES,
    boxes: () => boxes,
  },
};

const createServerWithMockedSchema = (customMocks = null) => {
  const opts = {typeDefs, resolvers};

  if (customMocks) {
    opts.mocks = customMocks;
  }

  return new ApolloServer(opts);
};

module.exports = {
  createServerWithMockedSchema,
};
