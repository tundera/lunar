import React from 'react';
import Head from 'next/head';
import {
  AppContextType,
  NextComponentType,
  AppInitialProps,
} from 'next/dist/next-server/lib/utils';

import { isSSR } from '../isBrowser';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

import { getToken } from './utils/auth';
import LinkMiddleware from './middleware';

export const withApollo = (
  App: NextComponentType<AppContextType, AppInitialProps, any>,
  { ssr = true } = {},
) => {
  const WithApollo = ({ apolloClient, apolloState, ...appProps }) => {
    const client = apolloClient || initApolloClient(apolloState, { getToken });

    return (
      <ApolloProvider client={client}>
        <App {...appProps} />
      </ApolloProvider>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    // Set correct display name for devtools
    WithApollo.displayName = `withApollo(${App.displayName})`;
  }

  WithApollo.getInitialProps = async (ctx: AppContextType) => {
    const {
      Component,
      router,
      ctx: { req, res },
    } = ctx;

    // @ts-ignore
    const apolloClient = (ctx.ctx.apolloClient = initApolloClient(
      {},
      {
        getToken: () => getToken(req),
      },
    ));

    const appProps = App.getInitialProps ? await App.getInitialProps(ctx) : {};

    if (res && res.finished) {
      // When redirecting, the response is finished.
      // No point in continuing to render
      return {};
    }

    if (ssr) {
      // Run all graphql queries in the component tree
      // and extract the resulting data
      try {
        const { getDataFromTree } = await import('@apollo/react-ssr');

        // Run all GraphQL queries
        await getDataFromTree(
          <ApolloProvider client={apolloClient}>
            <App {...appProps} Component={Component} router={router} />
          </ApolloProvider>,
        );
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        console.error('Error while running `getDataFromTree`', error);
        console.dir(apolloClient, { colors: true, depth: 2 });
      }

      // getDataFromTree does not call componentWillUnmount
      // head side effect therefore need to be cleared manually
      Head.rewind();
    }

    // Extract query data from the Apollo's store
    const apolloState = apolloClient.cache.extract();

    return {
      ...appProps,
      apolloState,
    };
  };

  return WithApollo;
};

type InitApolloClientOptions = [{}, { getToken: typeof getToken }];

let apolloClient: ApolloClient<NormalizedCacheObject> = null;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
const initApolloClient = (...args: InitApolloClientOptions) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    // @ts-ignore
    return createApolloClient(...args);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(...args);
  }

  return apolloClient;
};

/**
 * Creates and configures the ApolloClient
 */
const createApolloClient = (initialState = {}, { getToken }) => {
  const fetchOptions = {
    agent: null,
  };

  // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
  // 'https-proxy-agent' is required here because it's a sever-side only module
  if (typeof window === 'undefined') {
    if (process.env.HTTPS_PROXY) {
      fetchOptions.agent = new (require('https-proxy-agent'))(
        process.env.HTTPS_PROXY,
      );
    }
  }

  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState),
    connectToDevTools: isSSR(),
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: LinkMiddleware,
  });
};
