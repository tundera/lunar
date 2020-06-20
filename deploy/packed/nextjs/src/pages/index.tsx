import React from 'react';

import useSWR from 'swr';
import Link from 'next/link';
import Image from 'react-cool-img';

import { NextPage } from 'next';
import { request } from 'graphql-request';
import { Flex, Box, Styled } from 'theme-ui';
import { Button } from '@material-ui/core';

import ReactLogo from '../../public/images/react-logo.svg';

const IndexPage: NextPage = () => {
  const url = 'https://countries.trevorblades.com/';

  const CountriesFragment = `
    {
      countries {
        code
        languages {
          name
          native
        }
        emoji
      }
    }
  `;

  const { data, error, isValidating } = useSWR(
    CountriesFragment,
    (query) => request(url, query),
    {
      suspense: false,
    }
  );

  return (
    <Flex css={{ flexDirection: 'column', alignItems: 'center' }}>
      <Styled.h1>Monorepo Demo</Styled.h1>
      <h3>Index Page</h3>
      <Box>
        {' '}
        <p>A Next.js demo app d for pipeline testing and CI/CD integration</p>
      </Box>
      <Flex sx={{ paddingTop: 50, paddingBottom: 65 }}>
        <Image width={400} src={ReactLogo} alt="React-Shimmer image" />
      </Flex>
      <Flex
        sx={{
          textAlign: 'center',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ width: '100px' }}>
          <Button variant="outlined" href="/api/swapi" disabled={isValidating}>
            GOAT
          </Button>
        </Box>
      </Flex>
      <Flex>
        <Link href="/about">
          <a>About page</a>
        </Link>
      </Flex>
      <Flex>
        <a href="https://google.com">Google</a>
      </Flex>
      <Flex>
        <a href="/api/swapi">Load External API Data</a>
      </Flex>
    </Flex>
  );
};

IndexPage.getInitialProps = async () => {
  return {
    namespacesRequired: [''],
  };
};

export default IndexPage;
