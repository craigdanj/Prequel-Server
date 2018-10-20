const { ApolloServer, gql } = require('apollo-server');

const tasks = [
    {
        name: "Leo sed condimentum a sodales ante justo aliquam.",
        completed: false
    },
    {
        name: "Diam vulputate a condimentum scelerisque.",
        completed: false
    },
    {
        name: " Ligula eleifend cursus ullamcorper vel potenti",
        completed: false
    },
    {
        name: "Imperdiet eget netus gravida a mattis proin nullam.",
        completed: false
    },
    {
        name: "Curae ad cum ut dis vitae vestibulum diam.",
        completed: false
    }
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Task" type can be used in other type declarations.
  type Task {
    name: String
    completed: Boolean
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    tasks: [Task]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve tasks from the "tasks" array above.
const resolvers = {
  Query: {
    tasks: () => tasks,
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });


// This `listen` method launches a web-server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
