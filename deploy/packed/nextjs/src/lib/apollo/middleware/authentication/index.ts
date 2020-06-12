import { from } from '@apollo/client';

import AuthorizeHeadersLink from './AuthorizeHeaders';

const authMiddleware = from([AuthorizeHeadersLink]);

export default authMiddleware;
