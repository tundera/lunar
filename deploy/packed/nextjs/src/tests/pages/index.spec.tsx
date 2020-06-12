import { MockedProvider as ApolloMockedProvider } from '@apollo/client/testing';
import { render, cleanup, waitForElement } from '@testing-library/react';

import Index from '../../pages';

afterEach(cleanup);

it('Should render index page without crash', async () => {
  const { getByText } = render(
    <ApolloMockedProvider>
        <Index />
    </ApolloMockedProvider>,
  );

  await waitForElement(() => getByText(/greeting/i));
});
