import { ApolloLink } from '@apollo/client';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

const AuthorizeHeadersLink = new ApolloLink((operation, forward) => {
  const cookies = parseCookies();
  console.log({ cookies });

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: cookies['auth-token'] || null,
    },
  }));

  return forward(operation);
});

export default AuthorizeHeadersLink;
