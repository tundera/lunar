import fetch from 'isomorphic-fetch';
import { HttpLink } from '@apollo/client';

const HttpServerLink = new HttpLink({
  uri: process.env.GQL_HTTP_ENDPOINT, // Server URL (must be absolute)
  credentials: 'include',
  fetch,
  fetchOptions: {
    agent: null,
  },
});

export default HttpServerLink;
