import { NextApiRequest, NextApiResponse } from 'next';

import Cors from 'cors';
import initMiddleware from '../../../../libs/initMiddleware';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Run cors
  await cors(req, res);

  const data = await fetch('https://swapi.dev/api/people/1/');

  return res.status(200).json(data.body);
};
