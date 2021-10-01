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
    box(id: ID!): Box
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves boxes from the MOCK_BOXES response.
const resolvers = {
  Query: {
    boxes: () => MOCK_BOXES,
    box(parent, args) {
      return MOCK_BOXES.find(box => box.id === args.id);
    },
  },
};

const createServerWithMockedSchema = (customOptions = {}) => {
  const opts = {
    typeDefs,
    resolvers: {
      Query: {
        ...resolvers.Query,
        ...customOptions?.resolvers?.Query,
      },
    },
  };

  return new ApolloServer(opts);
};

module.exports = {
  createServerWithMockedSchema,
};
