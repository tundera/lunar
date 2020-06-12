import cookie from 'cookie';
import { IncomingMessage } from 'http';

export const getToken = (req?: IncomingMessage, options = {}) => {
  const cookies = cookie.parse(
    req?.headers?.cookie ?? document.cookie,
    options,
  );

  return cookies.token;
};
