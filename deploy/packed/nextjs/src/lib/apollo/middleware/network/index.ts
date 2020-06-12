// import { ApolloLink } from '@apollo/client';
// import { getMainDefinition } from '@apollo/client/utilities';

import httpLink from './HttpServer';
// import wsLink from './WebSocketServer';

// const NetworkTransferLink = new ApolloLink().split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );

const NetworkTransferLink = httpLink;

export default NetworkTransferLink;
