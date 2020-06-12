import { WebSocketLink } from '@apollo/link-ws';
// import { getToken } from '../../utils/auth';
import * as ws from 'ws';

const WebSocketServerLink: any = process.browser
  ? new WebSocketLink({
      uri: process.env.GQL_WS_ENDPOINT,
      options: {
        reconnect: true,
        // connectionParams: {
        //   authToken: getToken(),
        // },
      },
    })
  : ws;

export default WebSocketServerLink;
