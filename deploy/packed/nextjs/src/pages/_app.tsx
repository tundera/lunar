import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'theme-ui';

import theme from '../../themes';
import { withApollo } from '../lib/apollo';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default withApollo(MyApp);
