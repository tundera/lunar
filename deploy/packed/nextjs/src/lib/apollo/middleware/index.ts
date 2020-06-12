import { from } from '@apollo/client';

import authMiddleware from './authentication';
import activityMiddleware from './activity';
import networkMiddleware from './network';

const LinkMiddleware = from([
  authMiddleware,
  activityMiddleware,
  networkMiddleware,
]);

export default LinkMiddleware;
