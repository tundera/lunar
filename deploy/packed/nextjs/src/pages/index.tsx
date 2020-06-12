import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Img from 'react-cool-img';
import { useApolloClient } from '@apollo/client';

const IndexPage: NextPage = () => {
  const apolloClient = useApolloClient();

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Circle CI Demo</h1>
      <h3>Index Page</h3>
      <p>Built with GraphQL, Next.js, and Apollo</p>
      <p>A Next.js demo app for pipeline testing and CI/CD integration</p>
      <div>tundera</div>
      <div>
        <Img
          style={{ backgroundColor: 'grey', width: '480px', height: 'auto' }}
          src="https://www.gannett-cdn.com/presto/2020/01/26/USAT/80802abd-a62b-4420-8e15-ac4bd08c5929-2020-01-25_LeBron1.jpg?crop=2245,1688,x476,y589&width=2560"
          alt="React Cool Img"
        />
      </div>
      <div>
        <Link href="/about">
          <a>About page</a>
        </Link>
      </div>
      <div>
        <a href="https://google.com">Google</a>
      </div>
    </div>
  );
};

IndexPage.getInitialProps = async () => {
  return {
    namespacesRequired: [''],
  };
};

export default IndexPage;
