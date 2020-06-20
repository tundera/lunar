import { NowRequest, NowResponse } from '@now/node';

import getMovieWords from './getMovieWords';
import sendMessage from './sendMessage';

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const words = await getMovieWords(process.env.CONTENT_HTML);

    console.log(words.length);
    words.forEach(async (word) => {
      try {
        await sendMessage(word);
        res.json('done');
      } catch (err) {
        throw new Error(err);
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};
