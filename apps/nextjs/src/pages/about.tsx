import React, { Suspense } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import gql from 'graphql-tag';

import Button from '../components/Button';

const GET_COUNTRY_INFO = gql`
  query countries($code: ID!) {
    countries(code: $code) {
      code
      name
      languages {
        native
      }
    }
  }
`;

const AboutPage: NextPage = () => (
  <div style={{ textAlign: 'center' }}>
    <h1>SSG Demo</h1>
    <h3>About Page</h3>
    <p>A Next.js demo app</p>
    <div style={{ padding: '2vh 2vw' }}>
      <Link href="/">
        <a>Index page</a>
      </Link>
    </div>
    {process.browser ? (
      <Suspense fallback={<span>Loading button data...</span>}>
        <Button />
      </Suspense>
    ) : null}
  </div>
);

AboutPage.getInitialProps = async () => {
  return {
    namespacesRequired: ['common'],
  };
};

export default AboutPage;
