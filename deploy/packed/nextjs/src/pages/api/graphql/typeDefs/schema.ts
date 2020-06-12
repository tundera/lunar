import gql from 'graphql-tag';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

export default typeDefs;
