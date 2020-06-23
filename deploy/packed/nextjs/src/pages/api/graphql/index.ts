import { ApolloServer } from 'apollo-server-micro';

import typeDefs from './typeDefs/schema';
import resolvers from './resolvers';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';

    // try to retrieve a user with the token
    // const user = getUser(token);

    // add the user to the context
    return {
      name: 'First Last',
      email: 'something@gmail.com',
      phone: 5555555555,
    };
  },
  // playground: {
  //     endpoint: `${process.env.GQL_PLAYGROUND_ENDPOINT}/`,
  // },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({
  path: `${process.env.GQL_API_PATH}`,
});
